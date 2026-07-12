"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { userData } from "@/config/userData";
import ProjectVisual from "./ProjectVisual";

/*
 * Mobile projects — card deck. Each card pins while the next slides up
 * over it; previous cards stay visibly stacked behind (offset + scale),
 * so the pile reads clearly. Cards are compact: index, title, tagline,
 * artwork, metrics, links. No long copy on phones.
 */

const projects = userData.work;
const STACK_OFFSET = 30; // px each card sits below the one before — keeps the pile visible

function CompactCard({ project }) {
    return (
        <article className="overflow-hidden rounded-2xl border border-line-strong bg-card shadow-2xl shadow-black/80">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="font-mono text-xs text-accent">
                    {project.index} <span className="text-faint">/ 05</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {project.category}
                </span>
            </div>
            <div className="p-5">
                <h3 className="display text-3xl text-ink">{project.title}</h3>
                <p className="font-serif-accent mt-1.5 text-base text-muted">
                    {project.tagline}
                </p>
                <div className="mt-4 rounded-xl border border-line bg-elev p-2">
                    <ProjectVisual project={project} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2" aria-label="Key metrics">
                    {project.metrics.map((m) => (
                        <span
                            key={m}
                            className="rounded-full border border-line bg-accent-dim px-3 py-1 font-mono text-[10px] tracking-wide text-accent"
                        >
                            {m}
                        </span>
                    ))}
                </div>
                <div className="mt-5 flex items-center gap-5">
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink"
                        >
                            Live demo <ArrowUpRight size={14} />
                        </a>
                    )}
                    <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted"
                    >
                        <Github size={14} /> Source
                    </a>
                </div>
                {project.demoNote && (
                    <p className="mt-3 font-mono text-[10px] leading-relaxed text-faint">
                        ⚡ {project.demoNote}
                    </p>
                )}
            </div>
        </article>
    );
}

function DeckCard({ project, i, total, progress }) {
    const targetScale = 1 - (total - 1 - i) * 0.045;
    const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
    return (
        <div className="sticky top-0 flex h-screen items-center px-4">
            <motion.div
                style={{ scale, top: `calc(-7vh + ${i * STACK_OFFSET}px)` }}
                className="relative w-full"
            >
                <CompactCard project={project} />
            </motion.div>
        </div>
    );
}

export default function WorkMobile() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={ref} className="relative pt-6">
            {projects.map((p, i) => (
                <DeckCard
                    key={p.id}
                    project={p}
                    i={i}
                    total={projects.length}
                    progress={scrollYProgress}
                />
            ))}
        </div>
    );
}
