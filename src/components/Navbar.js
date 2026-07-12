"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { userData } from "@/config/userData";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(null);
    const progressRef = useRef(null);

    useEffect(() => {
        const sections = userData.nav
            .map((item) => ({ href: item.href, el: document.querySelector(item.href) }))
            .filter((s) => s.el);

        const onScroll = () => {
            setScrolled(window.scrollY > 24);

            // Page progress — written straight to the style so scrolling
            // never queues React renders
            if (progressRef.current) {
                const max = document.documentElement.scrollHeight - window.innerHeight;
                const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
                progressRef.current.style.transform = `scaleX(${p})`;
            }

            // Active section — the last one whose top has crossed the upper
            // third of the viewport
            const line = window.innerHeight * 0.38;
            let current = null;
            for (const s of sections) {
                if (s.el.getBoundingClientRect().top <= line) current = s.href;
            }
            setActive(current);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "border-b border-line bg-bg/80 backdrop-blur-md"
                    : "border-b border-transparent bg-transparent"
            }`}
        >
            <nav
                aria-label="Primary"
                className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
            >
                <a
                    href="#top"
                    className="font-mono text-sm tracking-tight text-ink"
                    aria-label="Back to top"
                >
                    preetish<span className="text-accent">.</span>ubhrani
                </a>

                {/* Desktop */}
                <div className="hidden items-center gap-8 md:flex">
                    {userData.nav.map((item) => {
                        const isActive = active === item.href;
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                aria-current={isActive ? "true" : undefined}
                                className={`relative pb-0.5 text-sm transition-colors ${
                                    isActive
                                        ? "text-ink"
                                        : "link-sweep text-muted hover:text-ink"
                                }`}
                            >
                                {item.name}
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-active"
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                                    />
                                )}
                            </a>
                        );
                    })}
                    <a
                        href={userData.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-line-strong px-4 py-1.5 font-mono text-xs text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                        Resume ↗
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="text-ink md:hidden"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label={open ? "Close menu" : "Open menu"}
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Page progress — hairline under the nav */}
            <span
                ref={progressRef}
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[-1px] block h-px origin-left bg-accent"
                style={{ transform: "scaleX(0)" }}
            />

            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop — dims the page so the drawer reads as a layer */}
                        <motion.button
                            type="button"
                            aria-label="Close menu"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 -z-10 h-screen w-screen cursor-default bg-bg/70 backdrop-blur-sm md:hidden"
                        />
                        <motion.div
                            id="mobile-menu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden border-b border-line bg-bg/95 backdrop-blur-md md:hidden"
                        >
                            <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
                                {userData.nav.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={`py-2.5 text-lg transition-colors hover:text-ink ${
                                            active === item.href ? "text-accent" : "text-muted"
                                        }`}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                                <a
                                    href={userData.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 w-fit rounded-full border border-line-strong px-5 py-2 font-mono text-xs text-ink"
                                >
                                    Resume ↗
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
