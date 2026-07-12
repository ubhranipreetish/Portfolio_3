"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { userData } from "@/config/userData";
import SectionIntro from "./SectionIntro";
import Reveal from "./Reveal";

export default function About() {
    const { about } = userData;
    return (
        <section id="about" className="scroll-mt-24">
            <SectionIntro title="About" />

            <div className="mx-auto max-w-6xl px-6 pb-16 pt-6 sm:pb-20 sm:pt-10 lg:pb-28">
                <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
                    {/* Left — portrait + facts */}
                    <Reveal>
                        <div className="overflow-hidden rounded-2xl border border-line bg-card">
                            <div className="relative aspect-[4/5]">
                                <Image
                                    src={userData.avatar}
                                    alt={`Illustrated avatar of ${userData.name}`}
                                    fill
                                    sizes="(max-width: 1024px) 90vw, 400px"
                                    className="object-cover object-top"
                                />
                                <div
                                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent"
                                    aria-hidden="true"
                                />
                            </div>
                            <ul className="divide-y divide-line px-6 py-2">
                                {about.facts.map((fact) => (
                                    <li key={fact.label} className="flex items-center justify-between py-3">
                                        <span className="mono-label">{fact.label}</span>
                                        <span className="text-sm text-ink">{fact.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    {/* Right — story, vertically centered against the image */}
                    <div>
                        <Reveal>
                            <p className="display text-3xl text-ink sm:text-4xl">
                                {about.lede.split("whole road")[0]}
                                <span className="font-serif-accent text-accent">whole road.</span>
                            </p>
                        </Reveal>
                        {about.story.map((para, i) => (
                            <Reveal key={i} delay={0.1 + i * 0.08}>
                                <p className="mt-7 leading-relaxed text-muted">{para}</p>
                            </Reveal>
                        ))}

                        <Reveal delay={0.3}>
                            <a
                                href={userData.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-bg transition-transform hover:scale-[1.04]"
                            >
                                Download Resume
                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </a>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
