"use client";

import { useState } from "react";
import Image from "next/image";
import ProjectMotif from "./ProjectMotif";

/* ── Project key art ──────────────────────────────────────────────────
   Each project's hero poster: a cinematic scene of its subject matter,
   graded to the Signal palette, carrying the project name and tagline.
   One frame treatment for all five so they read as a set — fixed 16:10
   stage, hairline border, soft wash into the canvas, index badge.
   Falls back to the generative motif when a project has no image (or
   the file fails to load). Optional `project.capture` (muted mp4/webm)
   plays on hover.                                                      */

export default function ProjectShot({ project }) {
    const [failed, setFailed] = useState(false);
    const [hovering, setHovering] = useState(false);

    if (!project.screenshot || failed) {
        return (
            <div className="motif-frame relative overflow-hidden rounded-xl border border-line">
                <ProjectMotif motif={project.motif} title={project.title} />
            </div>
        );
    }

    return (
        <figure
            className="group relative overflow-hidden rounded-xl border border-line bg-elev"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <div className="relative aspect-[16/10]">
                <Image
                    src={project.screenshot}
                    alt={`${project.title} — ${project.tagline}`}
                    fill
                    sizes="(max-width: 1024px) 92vw, 640px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    onError={() => setFailed(true)}
                />
                {project.capture && (
                    <video
                        src={project.capture}
                        muted
                        loop
                        playsInline
                        preload="none"
                        ref={(el) => {
                            if (!el) return;
                            if (hovering) el.play().catch(() => {});
                            else el.pause();
                        }}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                            hovering ? "opacity-100" : "opacity-0"
                        }`}
                        aria-hidden="true"
                    />
                )}

                {/* wash into the canvas so the poster sits in the page */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(10,10,12,0) 62%, rgba(10,10,12,0.5) 100%)",
                        boxShadow: "inset 0 0 0 1px rgba(235,235,225,0.05)",
                    }}
                />

                {/* index badge */}
                <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-line-strong bg-bg/70 px-2.5 py-1 font-mono text-[10px] tracking-wide text-faint backdrop-blur-sm">
                    /{project.index}
                </span>
            </div>
        </figure>
    );
}
