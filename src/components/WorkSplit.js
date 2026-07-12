"use client";

import { useEffect, useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
} from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { userData } from "@/config/userData";
import ProjectVisual from "./ProjectVisual";

/*
 * Split-screen index.
 * Desktop: left half pins — giant number, title, metrics and links
 * crossfade as the right column scrolls naturally past.
 * Mobile: each project becomes a cinematic block — a huge outlined index
 * parallaxes behind it while the artwork scales and drifts into place.
 */

function Links({ project, className = "" }) {
    return (
        <div className={`flex items-center gap-5 ${className}`}>
            {project.live && (
                <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                    Live demo
                    <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                </a>
            )}
            <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
            >
                <Github size={15} />
                Source
            </a>
        </div>
    );
}

function Metrics({ project }) {
    return (
        <div className="flex flex-wrap gap-2" aria-label="Key metrics">
            {project.metrics.map((m) => (
                <span
                    key={m}
                    className="rounded-full border border-line bg-accent-dim px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-accent"
                >
                    {m}
                </span>
            ))}
        </div>
    );
}

function DetailBlock({ project, index }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const ghostY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
    const artY = useTransform(scrollYProgress, [0, 1], [36, -36]);
    const artScale = useTransform(scrollYProgress, [0, 0.35], [0.9, 1]);

    return (
        <div
            ref={ref}
            data-work-index={index}
            className="relative flex flex-col justify-center gap-6 lg:min-h-screen lg:py-16"
        >
            {/* Desktop-only identity chip — every block owns its index even
                while the pinned panel is mid-crossfade */}
            <div className="hidden items-center gap-3 border-t border-line pt-4 lg:flex">
                <span className="font-mono text-xs text-accent">/{project.index}</span>
                <span className="mono-label">{project.category}</span>
            </div>
            {/* Mobile-only ghost index, parallaxing behind the block */}
            <motion.span
                style={{ y: ghostY }}
                aria-hidden="true"
                className="display text-stroke pointer-events-none absolute -top-8 right-0 z-0 select-none text-[42vw] leading-none opacity-60 lg:hidden"
            >
                {project.index}
            </motion.span>

            {/* Mobile-only header (left panel hidden) */}
            <div className="relative z-10 lg:hidden">
                <p className="font-mono text-xs text-accent">
                    {project.index} <span className="text-faint">/ 05</span>
                    <span className="mx-3 text-faint">·</span>
                    <span className="text-muted">{project.category}</span>
                </p>
                <h3 className="display mt-3 text-3xl text-ink">{project.title}</h3>
                <p className="font-serif-accent mt-2 text-lg text-muted">
                    {project.tagline}
                </p>
            </div>

            {/* Artwork — scales and drifts in as it enters */}
            <motion.div
                style={{ y: artY, scale: artScale }}
                className="relative z-10 rounded-2xl border border-line bg-card p-3"
            >
                <ProjectVisual project={project} />
            </motion.div>

            <div className="relative z-10 flex flex-col gap-6">
                <p className="leading-relaxed text-muted">{project.description}</p>

                <ul className="space-y-2.5">
                    {project.highlights.map((h, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                            <span className="mt-0.5 text-accent" aria-hidden="true">→</span>
                            {h}
                        </li>
                    ))}
                </ul>

                <p className="font-mono text-xs leading-relaxed text-faint">
                    {project.stack.join("  ·  ")}
                </p>

                {/* Mobile-only metrics + links */}
                <div className="space-y-5 lg:hidden">
                    <Metrics project={project} />
                    <Links project={project} />
                    {project.demoNote && (
                        <p className="font-mono text-[11px] leading-relaxed text-faint">
                            ⚡ {project.demoNote}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function WorkSplit() {
    const listRef = useRef(null);
    const projects = userData.work;
    const [active, setActive] = useState(0);

    // The pinned left panel follows whichever block's CONTENT is crossing the
    // middle of the viewport — so the heading can never describe one project
    // while the reader is looking at another.
    useEffect(() => {
        const el = listRef.current;
        if (!el) return;
        const blocks = Array.from(el.querySelectorAll("[data-work-index]"));
        const measure = () => {
            const mid = window.innerHeight / 2;
            for (const b of blocks) {
                const r = b.getBoundingClientRect();
                if (r.top <= mid && r.bottom >= mid) {
                    setActive(Number(b.dataset.workIndex));
                    return;
                }
            }
        };
        measure();
        window.addEventListener("scroll", measure, { passive: true });
        window.addEventListener("resize", measure);
        return () => {
            window.removeEventListener("scroll", measure);
            window.removeEventListener("resize", measure);
        };
    }, []);

    const current = projects[active];

    return (
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pt-10 lg:grid-cols-2 lg:gap-16">
                {/* Left — pinned index (desktop) */}
                <div className="hidden lg:block">
                    <div className="sticky top-0 flex h-screen flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.id}
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -28 }}
                                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                            >
                                <span className="display text-stroke block text-[9rem] leading-none">
                                    {current.index}
                                </span>
                                <p className="mono-label mt-4">{current.category}</p>
                                <h3 className="display mt-3 text-5xl text-ink">
                                    {current.title}
                                </h3>
                                <p className="font-serif-accent mt-3 text-xl text-muted">
                                    {current.tagline}
                                </p>
                                <div className="mt-6">
                                    <Metrics project={current} />
                                </div>
                                <Links project={current} className="mt-7" />
                                {current.demoNote && (
                                    <p className="mt-3 font-mono text-[11px] leading-relaxed text-faint">
                                        ⚡ {current.demoNote}
                                    </p>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Index rail */}
                        <div className="absolute bottom-10 left-0 flex items-center gap-3">
                            {projects.map((p, i) => (
                                <span
                                    key={p.id}
                                    className={`h-1 rounded-full transition-all duration-300 ${
                                        i === active ? "w-10 bg-accent" : "w-4 bg-line-strong"
                                    }`}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right — naturally scrolling details */}
                <div ref={listRef} className="space-y-28 py-16 lg:space-y-0 lg:py-0">
                    {projects.map((project, i) => (
                        <DetailBlock key={project.id} project={project} index={i} />
                    ))}
                </div>
        </div>
    );
}
