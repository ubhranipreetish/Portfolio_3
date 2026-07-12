"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { userData } from "@/config/userData";
import SectionIntro from "./SectionIntro";

const SphereGalleryScene = dynamic(() => import("./three/SphereGalleryScene"), {
    ssr: false,
});

/*
 * The Sphere — phantom.land-style immersive gallery of every project.
 * You stand inside a sphere tiled with project cards; drag (or swipe, or
 * arrow keys) to look around with damped, lenis-style easing. Clicking a
 * card animates a detail page in over the site — basic template only,
 * the gallery is the star.
 */

const EASE_OUT = [0.19, 1, 0.22, 1]; // expo-ish, matches the site's reveals
const EASE_IN = [0.55, 0.055, 0.675, 0.19];

const stagger = {
    hidden: { opacity: 0, y: 34 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.32 + i * 0.06, duration: 0.55, ease: EASE_OUT },
    }),
};

export default function ProjectSphere() {
    const wrapRef = useRef(null);
    const closeRef = useRef(null);
    const [selected, setSelected] = useState(null);
    const [reduce, setReduce] = useState(false);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }, []);

    // Mount the WebGL canvas only near the viewport
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => e.isIntersecting && setInView(true),
            { rootMargin: "600px" }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Every project, normalized — flagships keep their metrics & taglines
    const projects = useMemo(() => {
        const flagship = userData.work.map((p) => ({
            index: p.index,
            title: p.title,
            category: p.category,
            year: p.year,
            tagline: p.tagline,
            description: p.description,
            stack: p.stack,
            metrics: p.metrics,
            repo: p.repo,
            live: p.live,
            flagship: true,
        }));
        const archive = userData.archive.map((p, i) => ({
            index: String(i + 6).padStart(2, "0"),
            title: p.title,
            category: p.category,
            year: p.year,
            description: p.description,
            stack: p.stack,
            repo: p.repo,
            live: p.live,
            flagship: false,
        }));
        return [...flagship, ...archive];
    }, []);

    const open = useCallback((project) => setSelected(project), []);
    const close = useCallback(() => setSelected(null), []);

    // Escape closes; focus moves to the close button while open
    useEffect(() => {
        if (!selected) return;
        closeRef.current?.focus();
        const onKey = (e) => e.key === "Escape" && close();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [selected, close]);

    return (
        <section id="sphere" className="scroll-mt-24">
            <SectionIntro
                title="The Sphere"
                subtitle={
                    <>
                        Step inside —{" "}
                        <span className="font-serif-accent text-accent">
                            every build, all around you.
                        </span>
                    </>
                }
            />

            {/* The gallery — full-bleed, drag to look around */}
            <div
                ref={wrapRef}
                tabIndex={0}
                className="relative mt-12 h-[70vh] cursor-grab select-none overflow-hidden border-y border-line outline-none focus-visible:border-accent/50 sm:h-[82vh]"
                style={{ touchAction: "pan-y" }}
                aria-label="3D gallery of projects — drag, swipe or use arrow keys to look around, click a card to open it"
            >
                {inView && (
                    <SphereGalleryScene
                        projects={projects}
                        onPick={open}
                        reduce={reduce}
                        wrapRef={wrapRef}
                    />
                )}

                {/* Corner hints — same mono-label language as the rest of the site */}
                <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
                    <span className="rounded-full border border-line bg-bg/70 px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-muted backdrop-blur">
                        <span className="hidden sm:inline">DRAG OR ARROW KEYS · CLICK A CARD</span>
                        <span className="sm:hidden">SWIPE SIDEWAYS · TAP A CARD</span>
                    </span>
                </div>
                <span className="pointer-events-none absolute left-5 top-5 font-mono text-[11px] tracking-[0.14em] text-faint">
                    {String(projects.length).padStart(2, "0")} PROJECTS · 360°
                </span>
            </div>

            {/* ── Detail page — animates in over everything (basic template) ── */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        key="sphere-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.3 } }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[90] bg-bg/60"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selected.title} details`}
                        onClick={(e) => e.target === e.currentTarget && close()}
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0, transition: { duration: 0.7, ease: EASE_OUT } }}
                            exit={{ y: "100%", transition: { duration: 0.5, ease: EASE_IN } }}
                            className="absolute inset-x-0 bottom-0 top-[7vh] overflow-y-auto rounded-t-3xl border-t border-accent/40 bg-bg"
                        >
                            {/* Ghost index watermark */}
                            <span
                                aria-hidden="true"
                                className="display text-stroke pointer-events-none fixed right-0 top-[10vh] select-none text-[38vw] leading-none opacity-40"
                            >
                                {selected.index}
                            </span>

                            <div className="relative mx-auto max-w-5xl px-6 py-16 lg:py-24">
                                <button
                                    ref={closeRef}
                                    onClick={close}
                                    aria-label="Close project details"
                                    className="absolute right-6 top-8 flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                                >
                                    <X size={18} />
                                </button>

                                <motion.p custom={0} variants={stagger} initial="hidden" animate="show" className="font-mono text-xs text-accent">
                                    /{selected.index}
                                    <span className="mx-3 text-faint">·</span>
                                    <span className="text-muted">{selected.category}</span>
                                    {selected.year && (
                                        <>
                                            <span className="mx-3 text-faint">·</span>
                                            <span className="text-faint">{selected.year}</span>
                                        </>
                                    )}
                                </motion.p>

                                <motion.h3 custom={1} variants={stagger} initial="hidden" animate="show" className="display mt-6 text-5xl text-ink sm:text-7xl">
                                    {selected.title}
                                </motion.h3>

                                {selected.tagline && (
                                    <motion.p custom={2} variants={stagger} initial="hidden" animate="show" className="font-serif-accent mt-4 text-xl text-accent sm:text-2xl">
                                        {selected.tagline}
                                    </motion.p>
                                )}

                                <motion.p custom={3} variants={stagger} initial="hidden" animate="show" className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
                                    {selected.description}
                                </motion.p>

                                {selected.metrics && (
                                    <motion.div custom={4} variants={stagger} initial="hidden" animate="show" className="mt-8 flex flex-wrap gap-2">
                                        {selected.metrics.map((m) => (
                                            <span
                                                key={m}
                                                className="rounded-full border border-line bg-accent-dim px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-accent"
                                            >
                                                {m}
                                            </span>
                                        ))}
                                    </motion.div>
                                )}

                                <motion.p custom={5} variants={stagger} initial="hidden" animate="show" className="mt-8 font-mono text-xs leading-relaxed text-faint">
                                    {selected.stack.join("  ·  ")}
                                </motion.p>

                                <motion.div custom={6} variants={stagger} initial="hidden" animate="show" className="mt-10 flex items-center gap-6">
                                    {selected.live && (
                                        <a
                                            href={selected.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-bg transition-transform hover:scale-[1.04]"
                                        >
                                            Live demo <ArrowUpRight size={16} />
                                        </a>
                                    )}
                                    <a
                                        href={selected.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                                    >
                                        <Github size={16} /> Source
                                    </a>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
