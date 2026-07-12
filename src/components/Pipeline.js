"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { userData } from "@/config/userData";
import SectionIntro from "./SectionIntro";

const PipelineScene = dynamic(() => import("./three/PipelineScene"), {
    ssr: false,
});

function Step({ step, i, total, progress }) {
    const center = i / (total - 1);
    const w = 0.17;
    const opacity = useTransform(
        progress,
        [center - w, center - w * 0.4, center + w * 0.4, center + w],
        [0, 1, 1, 0]
    );
    const y = useTransform(progress, [center - w, center + w], [36, -36]);

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-x-0 bottom-[8vh] md:bottom-auto md:top-1/2 md:-translate-y-1/2"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="max-w-md">
                    <p className="font-mono text-xs tracking-wider text-accent">
                        {step.k} / 04 — {step.name}
                    </p>
                    <h3 className="display mt-4 text-4xl text-ink sm:text-5xl lg:text-6xl">
                        {step.line}
                    </h3>
                    <p className="mt-5 hidden text-sm leading-relaxed text-muted sm:block sm:text-base">
                        {step.body}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {step.tools.split("·").map((tool) => (
                            <span
                                key={tool}
                                className="rounded-full border border-line bg-accent-dim px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-accent"
                            >
                                {tool.trim()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Pipeline() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });
    const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const steps = userData.pipeline.steps;

    return (
        <section
            id="process"
            className="scroll-mt-24"
            aria-label="How I work — from data to models to agents to products"
        >
            <SectionIntro
                title="Process"
                subtitle={
                    <>
                        How raw data becomes{" "}
                        <span className="font-serif-accent text-accent">
                            a shipped product.
                        </span>
                    </>
                }
            />

            {/* Pinned morphing scene — scroll drives the data → product transform */}
            <div ref={ref} className="relative h-[340vh]">
                <div className="sticky top-0 h-screen overflow-hidden">
                    <div className="absolute inset-0" aria-hidden="true">
                        <PipelineScene progress={scrollYProgress} />
                    </div>

                    <div className="pointer-events-none absolute inset-0">
                        {steps.map((step, i) => (
                            <Step
                                key={step.k}
                                step={step}
                                i={i}
                                total={steps.length}
                                progress={scrollYProgress}
                            />
                        ))}

                        {/* Scroll progress rail */}
                        <div
                            className="absolute right-6 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-line lg:block"
                            aria-hidden="true"
                        >
                            <motion.div
                                style={{ scaleY: barScale }}
                                className="h-full w-full origin-top bg-accent"
                            />
                        </div>

                        {/* Impatient readers can bail straight to the proof */}
                        <a
                            href="#work"
                            className="pointer-events-auto absolute bottom-5 right-6 font-mono text-[11px] tracking-[0.14em] text-faint transition-colors hover:text-accent"
                        >
                            SKIP TO WORK ↓
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
