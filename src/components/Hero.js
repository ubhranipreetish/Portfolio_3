"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { userData } from "@/config/userData";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

/* Entrance choreography is pure CSS (.anim-rise / .anim-fade in globals.css)
   so the name and roles paint even if JS is slow or blocked — the first
   viewport never depends on hydration. */

function RiseLine({ children, delay, className = "" }) {
    return (
        <span className="block overflow-hidden">
            <span className={`anim-rise block ${className}`} style={{ animationDelay: `${delay}s` }}>
                {children}
            </span>
        </span>
    );
}

export default function Hero() {
    const reduce = useReducedMotion();

    return (
        <section
            id="top"
            className="relative flex min-h-[100svh] flex-col overflow-hidden"
        >
            {/* Galaxy — sits as a band up top across every screen size. The layout
                band keeps the headline in its spot, while the canvas inside overflows
                downward so the particles reach the name with no black gap below. */}
            <div className="relative h-[40svh] w-full shrink-0 lg:h-[40svh]">
                <div className="absolute inset-x-0 top-0 h-[76svh] lg:h-[78svh]" aria-hidden="true">
                    <HeroScene reduce={!!reduce} />
                    <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg" />
                </div>
            </div>

            {/* Content — comes down and fills the remaining screen beneath the effect */}
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-16">
                <h1 className="display uppercase">
                    <RiseLine delay={0.1} className="text-[clamp(3.2rem,12vw,10.5rem)] text-ink">
                        Preetish
                    </RiseLine>
                    <RiseLine delay={0.22} className="text-stroke text-[clamp(3.2rem,12vw,10.5rem)]">
                        Ubhrani
                    </RiseLine>
                </h1>

                {/* Roles — stacked list on phones, one line from sm: up */}
                <ul
                    className="anim-fade mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-0"
                    style={{ animationDelay: "0.5s" }}
                >
                    {userData.roles.map((r, i) => (
                        <li
                            key={r}
                            className="flex items-center text-xl tracking-tight text-ink sm:text-2xl"
                        >
                            <span className="mr-3 text-sm text-accent sm:hidden" aria-hidden="true">
                                ✦
                            </span>
                            {r}
                            {i < userData.roles.length - 1 && (
                                <span className="mx-3 hidden text-accent sm:inline" aria-hidden="true">
                                    ✦
                                </span>
                            )}
                        </li>
                    ))}
                </ul>

                <p
                    className="anim-fade mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
                    style={{ animationDelay: "0.65s" }}
                >
                    {userData.intro}
                </p>
            </div>

            {/* Scroll cue — desktop only (mobile layout is fuller now) */}
            <div
                className="anim-fade absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
                style={{ animationDelay: "1s" }}
                aria-hidden="true"
            >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                    scroll
                </span>
                <motion.span
                    animate={reduce ? {} : { y: [0, 6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="block h-8 w-px bg-gradient-to-b from-accent to-transparent"
                />
            </div>
        </section>
    );
}
