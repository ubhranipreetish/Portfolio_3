"use client";

import { userData } from "@/config/userData";
import SectionIntro from "./SectionIntro";
import Reveal from "./Reveal";

export default function Experience() {
    return (
        <section id="experience" className="scroll-mt-24">
            <SectionIntro
                title="Experience"
                subtitle={
                    <>
                        Shipping in production,{" "}
                        <span className="font-serif-accent text-accent">
                            not just in repos.
                        </span>
                    </>
                }
            />

            <div className="mx-auto max-w-6xl px-6 pb-16 pt-6 sm:pb-20 sm:pt-10 lg:pb-28">
                <ol className="space-y-0">
                    {userData.experience.map((job, i) => (
                        <Reveal key={job.company} delay={i * 0.08}>
                            <li className="relative grid gap-6 border-l border-line py-8 pl-8 sm:py-12 sm:pl-12 lg:grid-cols-[300px_1fr] lg:gap-12">
                                {/* Timeline node — aligned to the company name */}
                                <span
                                    className={`absolute -left-[5px] top-[2.9rem] h-[9px] w-[9px] rounded-full sm:top-[3.9rem] ${
                                        job.current ? "bg-accent status-ping" : "bg-faint"
                                    }`}
                                    aria-hidden="true"
                                />

                                {/* Meta column — the company leads */}
                                <div>
                                    <h3 className="display text-3xl text-ink sm:text-4xl">
                                        {job.company}
                                    </h3>
                                    <p className="mt-2 text-sm font-medium text-accent">
                                        {job.role}
                                    </p>
                                    <p className="mt-3 font-mono text-xs tracking-wider text-muted">
                                        {job.period}
                                    </p>
                                    <p className="mt-1 font-mono text-xs text-faint">{job.location}</p>
                                    {job.current && (
                                        <span className="mt-4 inline-block rounded-full border border-accent/40 bg-accent-dim px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                                            Current
                                        </span>
                                    )}
                                </div>

                                {/* Detail column */}
                                <div>
                                    <p className="font-serif-accent text-lg text-ink/90">
                                        {job.summary}
                                    </p>
                                    <ul className="mt-5 space-y-2.5">
                                        {job.points.map((point, j) => (
                                            <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                                                <span className="mt-0.5 text-accent" aria-hidden="true">→</span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                    {/* Skills — highlighted */}
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {job.stack.map((s) => (
                                            <span
                                                key={s}
                                                className="rounded-full border border-line bg-accent-dim px-3 py-1 font-mono text-[11px] tracking-wide text-accent"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    );
}
