"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeCircleTexture } from "./circleTexture";

/*
 * Scroll-driven particle morph. Four target configurations, one per
 * pipeline stage:
 *   chaos → raw data (noise cloud)
 *   bell  → models (gaussian surface)
 *   graph → agents (constellation state machine — nodes joined by edges)
 *   cube  → product (a shipped package — edge-traced cube with a core)
 * `progress` is a framer-motion MotionValue (0..1) owned by the
 * pinned section; positions are re-lerped every frame from it.
 */

const COUNT = 4200;

function buildGraph() {
    // Constellation state machine. Nodes are tight, dense balls so they
    // read as precise endpoints; edges run center-to-center with minimal
    // jitter so the lines stay crisp.
    const arr = new Float32Array(COUNT * 3);
    const centers = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let k = 0; k < 7; k++) {
        const y = 1 - (k / 6) * 2;
        const rad = Math.sqrt(Math.max(0, 1 - y * y));
        const th = golden * k * 7.3;
        centers.push([Math.cos(th) * rad * 2.3, y * 1.9, Math.sin(th) * rad * 2.3]);
    }
    const edges = [
        [0, 1], [0, 2], [1, 3], [2, 4], [3, 5],
        [4, 5], [5, 6], [1, 4], [2, 3], [0, 6],
    ];
    const nNode = Math.floor(COUNT * 0.45);
    for (let i = 0; i < COUNT; i++) {
        if (i < nNode) {
            const c = centers[i % 7];
            const r = 0.2 * Math.cbrt(Math.random());
            const th = Math.random() * Math.PI * 2;
            const ph = Math.acos(2 * Math.random() - 1);
            arr[i * 3] = c[0] + r * Math.sin(ph) * Math.cos(th);
            arr[i * 3 + 1] = c[1] + r * Math.cos(ph);
            arr[i * 3 + 2] = c[2] + r * Math.sin(ph) * Math.sin(th);
        } else {
            const [a, b] = edges[i % edges.length].map((k) => centers[k]);
            const t = Math.random();
            const j = 0.022;
            arr[i * 3] = a[0] + (b[0] - a[0]) * t + (Math.random() - 0.5) * j;
            arr[i * 3 + 1] = a[1] + (b[1] - a[1]) * t + (Math.random() - 0.5) * j;
            arr[i * 3 + 2] = a[2] + (b[2] - a[2]) * t + (Math.random() - 0.5) * j;
        }
    }
    return arr;
}

function buildConfigs() {
    const chaos = new Float32Array(COUNT * 3);
    const bell = new Float32Array(COUNT * 3);
    const cube = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
        const r = 3.4 * Math.cbrt(Math.random());
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        chaos[i * 3] = r * Math.sin(ph) * Math.cos(th) * 1.35;
        chaos[i * 3 + 1] = r * Math.cos(ph) * 0.75;
        chaos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }

    const cols = 84;
    const rows = Math.ceil(COUNT / cols);
    for (let i = 0; i < COUNT; i++) {
        const c = i % cols;
        const rw = Math.floor(i / cols);
        const x = (c / (cols - 1) - 0.5) * 7.4;
        const z = (rw / (rows - 1) - 0.5) * 5;
        bell[i * 3] = x;
        bell[i * 3 + 1] = 2.7 * Math.exp(-(x * x + z * z) / 2.3) - 1.1;
        bell[i * 3 + 2] = z;
    }

    const agents = buildGraph();

    // The package: 8 corners → 12 edges. Outer shell carries ~3/4 of the
    // particles, an inner accent core cube carries the rest.
    const S = 1.9;
    const corners = [];
    for (let k = 0; k < 8; k++) {
        corners.push([k & 1 ? S : -S, k & 2 ? S : -S, k & 4 ? S : -S]);
    }
    const edgePairs = [
        [0, 1], [2, 3], [4, 5], [6, 7],
        [0, 2], [1, 3], [4, 6], [5, 7],
        [0, 4], [1, 5], [2, 6], [3, 7],
    ];
    const nOuter = Math.floor(COUNT * 0.74);
    for (let i = 0; i < COUNT; i++) {
        const onOuter = i < nOuter;
        const scaleBox = onOuter ? 1 : 0.42;
        const edge = edgePairs[i % 12];
        const a = corners[edge[0]];
        const b = corners[edge[1]];
        const t = Math.random();
        const jitter = onOuter ? 0.045 : 0.03;
        cube[i * 3] = (a[0] + (b[0] - a[0]) * t) * scaleBox + (Math.random() - 0.5) * jitter;
        cube[i * 3 + 1] = (a[1] + (b[1] - a[1]) * t) * scaleBox + (Math.random() - 0.5) * jitter;
        cube[i * 3 + 2] = (a[2] + (b[2] - a[2]) * t) * scaleBox + (Math.random() - 0.5) * jitter;
    }

    return [chaos, bell, agents, cube];
}

const smooth = (t) => t * t * (3 - 2 * t);

function MorphPoints({ progress }) {
    const geo = useRef();
    const group = useRef();
    const configs = useMemo(buildConfigs, []);
    const positions = useMemo(() => configs[0].slice(), [configs]);
    const sprite = useMemo(makeCircleTexture, []);

    const colors = useMemo(() => {
        const arr = new Float32Array(COUNT * 3);
        const accent = new THREE.Color("#c9f24b");
        const bone = new THREE.Color("#ebebe3");
        for (let i = 0; i < COUNT; i++) {
            const c = Math.random() < 0.22 ? accent : bone;
            const dim = 0.4 + Math.random() * 0.6;
            arr[i * 3] = c.r * dim;
            arr[i * 3 + 1] = c.g * dim;
            arr[i * 3 + 2] = c.b * dim;
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (!geo.current || !group.current) return;
        const p = THREE.MathUtils.clamp(progress.get(), 0, 1);
        const s = Math.min(p * 3, 2.9999);
        const k = Math.floor(s);
        const t = smooth(s - k);
        const A = configs[k];
        const B = configs[k + 1];
        for (let i = 0; i < COUNT * 3; i++) {
            positions[i] = A[i] + (B[i] - A[i]) * t;
        }
        geo.current.attributes.position.needsUpdate = true;

        // Slow continuous tumble — the cube reads best mid-rotation
        const time = state.clock.elapsedTime;
        group.current.rotation.y = time * 0.14;
        group.current.rotation.x = -0.24 + Math.sin(time * 0.1) * 0.06;

        // Desktop: shift right of the copy. Mobile (portrait): center above it.
        const aspect = state.size.width / state.size.height;
        const targetX = aspect > 1 ? 1.1 : 0;
        const targetY = aspect > 1 ? 0.1 : 0.9;
        const targetScale = aspect > 1 ? 1 : 0.62;
        group.current.position.x += (targetX - group.current.position.x) * 0.08;
        group.current.position.y += (targetY - group.current.position.y) * 0.08;
        const sc = group.current.scale.x + (targetScale - group.current.scale.x) * 0.08;
        group.current.scale.setScalar(sc);
    });

    return (
        <group ref={group} position={[0, 0.1, 0]}>
            <points>
                <bufferGeometry ref={geo}>
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[colors, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    sizeAttenuation
                    vertexColors
                    transparent
                    opacity={0.9}
                    map={sprite}
                    alphaMap={sprite}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
}

export default function PipelineScene({ progress }) {
    return (
        <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 0, 7.4], fov: 50 }}
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            style={{ pointerEvents: "none" }}
        >
            <MorphPoints progress={progress} />
        </Canvas>
    );
}
