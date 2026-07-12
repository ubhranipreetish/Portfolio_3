"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeCircleTexture } from "./circleTexture";

const COUNT = 4500;

function Galaxy({ reduce }) {
    const group = useRef();
    const pointer = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e) => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    const sprite = useMemo(makeCircleTexture, []);

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 3);
        const inner = new THREE.Color("#c9f24b");
        const outer = new THREE.Color("#7a7a72");
        const arms = 4;
        for (let i = 0; i < COUNT; i++) {
            const radius = Math.pow(Math.random(), 0.65) * 4.6;
            const arm = ((i % arms) / arms) * Math.PI * 2;
            const angle = arm + radius * 1.05;
            const spread = (amt) =>
                (Math.random() - 0.5) * (Math.random() - 0.5) * 2 * amt;
            positions[i * 3] = Math.cos(angle) * radius + spread(1.0);
            positions[i * 3 + 1] = spread(0.5);
            positions[i * 3 + 2] = Math.sin(angle) * radius + spread(1.0);
            const c = inner.clone().lerp(outer, Math.min(radius / 4.6, 1));
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }
        return { positions, colors };
    }, []);

    useFrame((state, delta) => {
        if (!group.current) return;
        if (!reduce) group.current.rotation.y += delta * 0.045;
        const targetX = -0.5 + pointer.current.y * 0.1;
        const targetZ = pointer.current.x * 0.07;
        group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
        group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.04;
    });

    return (
        <group ref={group} rotation={[-0.5, 0, 0]} position={[0, 0.5, 0]}>
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[colors, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.035}
                    sizeAttenuation
                    vertexColors
                    transparent
                    opacity={0.85}
                    map={sprite}
                    alphaMap={sprite}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
}

export default function HeroScene({ reduce = false }) {
    return (
        <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 1.6, 5.4], fov: 55 }}
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            style={{ pointerEvents: "none" }}
        >
            <Galaxy reduce={reduce} />
        </Canvas>
    );
}
