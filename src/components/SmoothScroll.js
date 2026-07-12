"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        let rafId;
        const loop = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);

        // Route in-page anchors through Lenis so they ease instead of jump
        const onClick = (e) => {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            const target = document.querySelector(anchor.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            lenis.scrollTo(target, { offset: -72, duration: 1.4 });
        };
        document.addEventListener("click", onClick);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("click", onClick);
            lenis.destroy();
        };
    }, []);

    return null;
}
