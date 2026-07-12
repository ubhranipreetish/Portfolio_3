"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/*
 * Phantom.land-style spherical gallery.
 * The camera sits at the center of a sphere; project cards tile its inner
 * surface in three latitude rings. Left-click (or touch) drag pans the view
 * with lenis-style damped easing + release momentum; hovering a card lifts
 * it toward the camera; clicking one (without dragging) reports it upward
 * so the DOM overlay can animate a detail page in.
 */

const RADIUS = 10;
const ROWS = [
    { lat: -0.46, count: 9 },  // lower ring
    { lat: 0.0,   count: 11 }, // equator
    { lat: 0.46,  count: 9 },  // upper ring
];
const CARD_W = 4.55;
const CARD_H = 2.85;
const DRAG_DAMP = 15;      // tight follow while the finger is down
const GLIDE_DAMP = 6;      // relaxed follow while coasting
const FRICTION = 1.9;      // 1/s — exponential decay of release momentum
const MAX_VEL = 3.4;       // rad/s — cap flick speed
const PITCH_LIMIT = 0.5;   // rad — how far you can look up/down
const DRIFT = 0.028;       // idle auto-rotation, rad/s
const IDLE_AFTER = 3000;   // ms without input before drift resumes

// Drag sensitivity scales with the gallery's on-screen width so a
// full-width swipe turns the sphere about the same amount on any device.
const dragK = (width) => THREE.MathUtils.clamp(2.2 / Math.max(width, 1), 0.0012, 0.004);

/* ── Card texture — drawn to match the site's card language ── */

const INK = "#ebebe1";
const MUTED = "#8e8e85";
const FAINT = "#5b5b54";
const ACCENT = "#c9f24b";
const CARD_BG = "#131318";

function truncate(ctx, text, maxW) {
    if (ctx.measureText(text).width <= maxW) return text;
    while (text.length > 1 && ctx.measureText(text + "…").width > maxW) {
        text = text.slice(0, -1);
    }
    return text + "…";
}

function drawCardTexture(project, fonts) {
    const W = 640, H = 400, R = 26, P = 40;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    // Card plate + border (flagship cards carry the accent)
    ctx.beginPath();
    ctx.roundRect(1.5, 1.5, W - 3, H - 3, R);
    ctx.fillStyle = CARD_BG;
    ctx.fill();
    ctx.lineWidth = project.flagship ? 3 : 2;
    ctx.strokeStyle = project.flagship
        ? "rgba(201,242,75,0.55)"
        : "rgba(235,235,225,0.16)";
    ctx.stroke();

    // Header row — index (accent mono) + category (muted mono, upper)
    ctx.fillStyle = ACCENT;
    ctx.font = `500 24px ${fonts.mono}`;
    ctx.textBaseline = "top";
    ctx.fillText(`/${project.index}`, P, P - 4);

    ctx.fillStyle = MUTED;
    ctx.font = `500 15px ${fonts.mono}`;
    const cat = truncate(ctx, project.category.toUpperCase(), W - P * 2 - 90);
    ctx.fillText(cat, W - P - ctx.measureText(cat).width, P + 2);

    // Title — up to two lines of display type
    ctx.fillStyle = INK;
    ctx.font = `600 52px ${fonts.sans}`;
    const words = project.title.split(" ");
    const lines = [];
    let line = "";
    for (const w of words) {
        const test = line ? `${line} ${w}` : w;
        if (ctx.measureText(test).width > W - P * 2 && line) {
            lines.push(line);
            line = w;
        } else line = test;
    }
    lines.push(line);
    lines.slice(0, 2).forEach((l, i) => {
        ctx.fillText(truncate(ctx, l, W - P * 2), P, 148 + i * 60);
    });

    // Footer — stack (faint mono) + year
    ctx.fillStyle = FAINT;
    ctx.font = `400 16px ${fonts.mono}`;
    const stack = truncate(ctx, project.stack.join(" · "), W - P * 2 - 80);
    ctx.fillText(stack, P, H - P - 14);
    ctx.fillStyle = project.flagship ? ACCENT : MUTED;
    const yr = project.year ?? "";
    ctx.fillText(yr, W - P - ctx.measureText(yr).width, H - P - 14);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
}

/* ── One card on the inner sphere wall ── */

function Card({ project, texture, position, jitter, onPick, dragState }) {
    const mesh = useRef();
    const hover = useRef(0);

    useFrame((_, dt) => {
        const m = mesh.current;
        if (!m) return;
        const target = hover.current;
        // ease scale + pull the card slightly off the wall on hover
        m.userData.h = THREE.MathUtils.damp(m.userData.h ?? 0, target, 8, dt);
        const h = m.userData.h;
        const s = 1 + h * 0.07;
        m.scale.setScalar(s);
        m.material.color.setScalar(0.82 + h * 0.18);
    });

    return (
        <mesh
            ref={mesh}
            position={position}
            rotation={jitter}
            onPointerOver={(e) => {
                e.stopPropagation();
                if (dragState.current.dragging) return; // keep the grab feel mid-drag
                hover.current = 1;
                document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
                hover.current = 0;
                document.body.style.cursor = "";
            }}
            onClick={(e) => {
                e.stopPropagation();
                if (dragState.current.travel < 8) onPick(project);
            }}
        >
            <planeGeometry args={[CARD_W, CARD_H]} />
            <meshBasicMaterial
                map={texture}
                transparent
                side={THREE.FrontSide}
                color={0xd2d2d2}
            />
        </mesh>
    );
}

/* ── The sphere — tiles + drag/momentum controller ── */

function Gallery({ projects, onPick, reduce, wrapRef }) {
    const group = useRef();
    const { camera } = useThree();
    const [fontTick, setFontTick] = useState(0);

    // rotation state — targets move with input, rendered values chase them,
    // velocities carry release momentum (flick → glide)
    const rot = useRef({ yaw: 0, pitch: 0, tYaw: 0, tPitch: 0, vYaw: 0, vPitch: 0 });
    const dragState = useRef({
        dragging: false, travel: 0, lastX: 0, lastY: 0, lastT: 0, k: 0.002, touch: false,
    });
    const lastInput = useRef(0);

    // Redraw textures once the site fonts are ready (canvas needs them loaded)
    useEffect(() => {
        let alive = true;
        document.fonts?.ready?.then(() => alive && setFontTick(1));
        return () => { alive = false; };
    }, []);

    const fonts = useMemo(() => {
        if (typeof window === "undefined") return { sans: "sans-serif", mono: "monospace" };
        const body = getComputedStyle(document.body);
        return {
            sans: body.fontFamily || "sans-serif",
            mono: body.getPropertyValue("--font-geist-mono").trim() || "ui-monospace, monospace",
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fontTick]);

    const textures = useMemo(
        () => projects.map((p) => drawCardTexture(p, fonts)),
        [projects, fonts]
    );
    useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);

    // Tile the inner wall — ring by ring, cycling through the projects
    const tiles = useMemo(() => {
        const out = [];
        let n = 0;
        const rand = (seed) => {
            const x = Math.sin(seed * 999.7) * 43758.5453;
            return x - Math.floor(x);
        };
        ROWS.forEach((row, r) => {
            for (let i = 0; i < row.count; i++) {
                const idx = n % projects.length;
                const theta = (i / row.count) * Math.PI * 2 + r * 0.31;
                const radius = RADIUS + (rand(n) - 0.5) * 0.5;
                const pos = new THREE.Vector3(
                    Math.cos(row.lat) * Math.sin(theta) * radius,
                    Math.sin(row.lat) * radius,
                    Math.cos(row.lat) * Math.cos(theta) * radius
                );
                // face the camera at the center — eye at origin so the plane's
                // +Z (its face) points inward, toward the viewer
                const m = new THREE.Matrix4().lookAt(
                    new THREE.Vector3(0, 0, 0), pos, new THREE.Vector3(0, 1, 0)
                );
                const quat = new THREE.Quaternion().setFromRotationMatrix(m);
                const eul = new THREE.Euler().setFromQuaternion(quat);
                eul.z += (rand(n + 50) - 0.5) * 0.05; // organic tilt
                out.push({ key: n, idx, pos, rot: [eul.x, eul.y, eul.z] });
                n++;
            }
        });
        return out;
    }, [projects.length]);

    // Input handling on the wrapping element (so the grab survives leaving the canvas)
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const clampPitch = (v) => THREE.MathUtils.clamp(v, -PITCH_LIMIT, PITCH_LIMIT);

        const down = (e) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            const d = dragState.current;
            d.dragging = true;
            d.touch = e.pointerType === "touch";
            d.travel = 0;
            d.lastX = e.clientX;
            d.lastY = e.clientY;
            d.lastT = performance.now();
            d.k = dragK(el.clientWidth);
            rot.current.vYaw = 0;
            rot.current.vPitch = 0;
            lastInput.current = performance.now();
            el.style.cursor = "grabbing";
        };
        const move = (e) => {
            const d = dragState.current;
            if (!d.dragging) return;
            const dx = e.clientX - d.lastX;
            const dy = e.clientY - d.lastY;
            const now = performance.now();
            const dt = Math.min(Math.max(now - d.lastT, 4), 64) / 1000;
            d.travel += Math.abs(dx) + Math.abs(dy);
            const r = rot.current;
            // touch pitch is softened — vertical swipes mostly belong to page scroll
            const pitchScale = d.touch ? 0.55 : 1;
            r.tYaw += dx * d.k;
            r.tPitch = clampPitch(r.tPitch + dy * d.k * pitchScale);
            // EMA-smoothed velocity so a jittery last event can't spike the flick
            const instYaw = (dx * d.k) / dt;
            const instPitch = (dy * d.k * pitchScale) / dt;
            r.vYaw += (instYaw - r.vYaw) * 0.35;
            r.vPitch += (instPitch - r.vPitch) * 0.35;
            d.lastX = e.clientX;
            d.lastY = e.clientY;
            d.lastT = now;
            lastInput.current = now;
        };
        const up = () => {
            const d = dragState.current;
            if (!d.dragging) return;
            d.dragging = false;
            el.style.cursor = "grab";
            const r = rot.current;
            // stale velocity (finger rested before lifting) shouldn't fling
            if (performance.now() - d.lastT > 90) {
                r.vYaw = 0;
                r.vPitch = 0;
            }
            r.vYaw = THREE.MathUtils.clamp(r.vYaw, -MAX_VEL, MAX_VEL);
            r.vPitch = THREE.MathUtils.clamp(r.vPitch, -MAX_VEL, MAX_VEL);
            lastInput.current = performance.now();
        };

        // Trackpad horizontal swipe spins the sphere; vertical stays with the page
        const wheel = (e) => {
            if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
            e.preventDefault();
            const r = rot.current;
            r.tYaw -= e.deltaX * dragK(el.clientWidth) * 0.9;
            lastInput.current = performance.now();
        };

        // Keyboard panning when the gallery is focused
        const key = (e) => {
            const r = rot.current;
            const step = 0.22;
            if (e.key === "ArrowLeft") r.tYaw += step;
            else if (e.key === "ArrowRight") r.tYaw -= step;
            else if (e.key === "ArrowUp") r.tPitch = clampPitch(r.tPitch - step * 0.6);
            else if (e.key === "ArrowDown") r.tPitch = clampPitch(r.tPitch + step * 0.6);
            else return;
            e.preventDefault();
            lastInput.current = performance.now();
        };

        el.addEventListener("pointerdown", down);
        el.addEventListener("wheel", wheel, { passive: false });
        el.addEventListener("keydown", key);
        window.addEventListener("pointermove", move, { passive: true });
        window.addEventListener("pointerup", up);
        window.addEventListener("pointercancel", up);
        return () => {
            el.removeEventListener("pointerdown", down);
            el.removeEventListener("wheel", wheel);
            el.removeEventListener("keydown", key);
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
            window.removeEventListener("pointercancel", up);
        };
    }, [wrapRef]);

    useFrame((_, rawDt) => {
        const dt = Math.min(rawDt, 1 / 20); // don't lurch after a dropped frame
        const r = rot.current;
        const d = dragState.current;

        if (!d.dragging) {
            // coast on release momentum, decaying lenis-style
            const decay = Math.exp(-FRICTION * dt);
            r.vYaw *= decay;
            r.vPitch *= decay;
            if (Math.abs(r.vYaw) > 0.0004) r.tYaw += r.vYaw * dt;
            if (Math.abs(r.vPitch) > 0.0004) {
                r.tPitch = THREE.MathUtils.clamp(
                    r.tPitch + r.vPitch * dt, -PITCH_LIMIT, PITCH_LIMIT
                );
            }
            // ambient drift once the viewer has been hands-off for a moment
            if (!reduce && performance.now() - lastInput.current > IDLE_AFTER) {
                r.tYaw += DRIFT * dt;
            }
        }

        const damp = d.dragging ? DRAG_DAMP : GLIDE_DAMP;
        r.yaw = THREE.MathUtils.damp(r.yaw, r.tYaw, damp, dt);
        r.pitch = THREE.MathUtils.damp(r.pitch, r.tPitch, damp, dt);
        if (group.current) group.current.rotation.y = r.yaw;
        camera.rotation.x = r.pitch;
    });

    return (
        <group ref={group}>
            {tiles.map((t) => (
                <Card
                    key={t.key}
                    project={projects[t.idx]}
                    texture={textures[t.idx]}
                    position={t.pos}
                    jitter={t.rot}
                    onPick={onPick}
                    dragState={dragState}
                />
            ))}
        </group>
    );
}

export default function SphereGalleryScene({ projects, onPick, reduce = false, wrapRef }) {
    // Wider view on phones so a swipe reveals more of the wall at once
    const fov = typeof window !== "undefined" && window.innerWidth < 640 ? 82 : 72;
    return (
        <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 0, 0.01], fov, near: 0.1, far: 40 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
            <Gallery projects={projects} onPick={onPick} reduce={reduce} wrapRef={wrapRef} />
        </Canvas>
    );
}
