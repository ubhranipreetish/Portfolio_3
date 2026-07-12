"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { userData } from "@/config/userData";

/* ── Capabilities · "The Trailhead" ───────────────────────────────────
   "One engineer, four paths" as a giant table of contents.
   Desktop: massive editorial type on the left; arming a row slides a
   shared path-marker to it and points at a sticky readout panel that
   keeps copy on clean canvas. Mobile: the rows expand in place
   (accordion), so the detail always appears right under your thumb,
   never below the fold.                                               */

const caps = userData.capabilities;

/* ── Shared detail content ── */

function PathBody({ cap, reduce, compact = false }) {
    return (
        <>
            <p
                className={`max-w-2xl leading-relaxed text-ink/85 ${
                    compact ? "text-base" : "text-lg lg:text-xl"
                }`}
            >
                {cap.description}
            </p>

            <div className="mt-6 flex max-w-2xl flex-wrap gap-2">
                {cap.tools.map((t, j) => (
                    <motion.span
                        key={t}
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 + j * 0.045, duration: 0.3 }}
                        className="rounded-full border border-accent/25 bg-accent/5 px-3 py-1 font-mono text-[11px] text-muted"
                    >
                        {t}
                    </motion.span>
                ))}
            </div>

            <a
                href="#work"
                className="link-sweep mt-7 inline-flex items-baseline gap-2 font-mono text-[11px] tracking-[0.16em] text-muted hover:text-ink"
            >
                <span className="text-accent">▸</span>
                PROVEN IN — {cap.proof}
            </a>
        </>
    );
}

/* Roving-tabindex arrow-key navigation for the desktop tab rows. */
function useTabNav(count, active, setActive, refs) {
    return (e) => {
        let n = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (active + 1) % count;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (active - 1 + count) % count;
        else if (e.key === "Home") n = 0;
        else if (e.key === "End") n = count - 1;
        if (n != null) {
            e.preventDefault();
            setActive(n);
            refs.current[n]?.focus();
        }
    };
}

/* ── Desktop — editorial index + sticky readout ── */

function DesktopTrailhead({ reduce }) {
    const [active, setActive] = useState(0);
    const tabRefs = useRef([]);
    const onKeyDown = useTabNav(caps.length, active, setActive, tabRefs);
    const cap = caps[active];

    return (
        <div className="grid items-start gap-16 lg:grid-cols-[1.15fr_1fr]">
            <div
                role="tablist"
                aria-label="Capability paths"
                aria-orientation="vertical"
                className="border-b border-line"
                onKeyDown={onKeyDown}
            >
                {caps.map((c, i) => {
                    const on = i === active;
                    return (
                        <button
                            key={c.index}
                            ref={(el) => (tabRefs.current[i] = el)}
                            role="tab"
                            id={`trail-tab-${c.index}`}
                            aria-selected={on}
                            aria-controls="trail-panel"
                            tabIndex={on ? 0 : -1}
                            onClick={() => setActive(i)}
                            onMouseEnter={() => setActive(i)}
                            onFocus={() => setActive(i)}
                            className="group relative flex w-full items-baseline gap-5 border-t border-line py-7 text-left"
                        >
                            <span
                                className={`font-mono text-xs transition-colors duration-300 ${
                                    on ? "text-accent" : "text-faint"
                                }`}
                            >
                                0{i + 1}
                            </span>
                            <motion.span
                                animate={{ x: on && !reduce ? 12 : 0 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className={`display text-4xl transition-colors duration-300 xl:text-5xl ${
                                    on ? "text-accent" : "text-ink/80 group-hover:text-ink"
                                }`}
                            >
                                {c.title}
                            </motion.span>
                            <span className="ml-auto hidden shrink-0 font-mono text-[11px] tracking-[0.16em] text-faint xl:block">
                                {c.trace}
                            </span>

                            {/* shared path-marker sliding between rows → points at panel */}
                            {on && (
                                <motion.span
                                    layoutId="trail-marker"
                                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                    className="pointer-events-none absolute -right-16 top-1/2 h-px w-16 bg-accent"
                                    aria-hidden="true"
                                >
                                    <span className="absolute -right-1.5 -top-[7px] text-[10px] leading-none text-accent">
                                        ▸
                                    </span>
                                </motion.span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div
                id="trail-panel"
                role="tabpanel"
                aria-labelledby={`trail-tab-${cap.index}`}
                className="sticky top-28 overflow-hidden rounded-3xl border border-line bg-card"
            >
                <div className="min-h-[22rem] p-8 lg:p-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={cap.index}
                            initial={reduce ? false : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="font-mono text-[11px] tracking-[0.16em] text-faint">
                                PATH 0{active + 1} / 04 — {cap.trace}
                            </span>
                            <h3 className="display mt-3 text-3xl text-ink">{cap.title}</h3>
                            <div className="mt-5">
                                <PathBody cap={cap} reduce={reduce} />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

/* ── Mobile — the same index, but rows expand in place ── */

function MobileRow({ cap, i, open, onToggle, reduce }) {
    return (
        <div className="border-t border-line">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={`trail-acc-${cap.index}`}
                className="flex w-full items-baseline gap-4 py-6 text-left"
            >
                <span
                    className={`font-mono text-xs transition-colors duration-300 ${
                        open ? "text-accent" : "text-faint"
                    }`}
                >
                    0{i + 1}
                </span>
                <span
                    className={`display text-2xl transition-colors duration-300 sm:text-3xl ${
                        open ? "text-accent" : "text-ink"
                    }`}
                >
                    {cap.title}
                </span>
                {/* plus → cross */}
                <span
                    aria-hidden="true"
                    className={`ml-auto shrink-0 self-center font-mono text-xl leading-none transition-transform duration-300 ${
                        open ? "rotate-45 text-accent" : "text-faint"
                    }`}
                >
                    +
                </span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={`trail-acc-${cap.index}`}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8">
                            <PathBody cap={cap} reduce={reduce} compact />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function MobileTrailhead({ reduce }) {
    const [open, setOpen] = useState(0);
    return (
        <div className="border-b border-line">
            {caps.map((cap, i) => (
                <MobileRow
                    key={cap.index}
                    cap={cap}
                    i={i}
                    open={open === i}
                    reduce={reduce}
                    onToggle={() => setOpen(open === i ? null : i)}
                />
            ))}
        </div>
    );
}

export default function CapabilitiesIndex() {
    const reduce = useReducedMotion();
    return (
        <>
            <div className="hidden lg:block">
                <DesktopTrailhead reduce={reduce} />
            </div>
            <div className="lg:hidden">
                <MobileTrailhead reduce={reduce} />
            </div>
        </>
    );
}
