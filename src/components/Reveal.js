"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({ children, delay = 0, y = 28, className = "" }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
