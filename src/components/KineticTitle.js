"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/*
 * Decorative oversized title that drifts horizontally with scroll.
 * Always paired with a real (screen-reader-visible) heading elsewhere,
 * so this is aria-hidden.
 */
export default function KineticTitle({ text, outline = true }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const x = useTransform(scrollYProgress, [0, 1], ["9%", "-3%"]);

    return (
        <div ref={ref} className="relative overflow-hidden py-3" aria-hidden="true">
            <motion.div
                style={{ x, whiteSpace: "nowrap", textWrap: "nowrap" }}
                className="display w-max text-[10vw] uppercase leading-none"
            >
                <span className="text-ink">{text}</span>
                <span className="mx-[3vw] text-accent">✦</span>
                <span className={outline ? "text-stroke" : "text-ink"}>{text}</span>
            </motion.div>
        </div>
    );
}
