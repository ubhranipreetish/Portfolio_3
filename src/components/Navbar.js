"use client";

import { motion } from "framer-motion";
import { userData } from "@/config/userData";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        const sections = userData.navLinks.map(link =>
            document.querySelector(link.href)
        ).filter(Boolean);

        sections.forEach(section => observer.observe(section));

        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between bg-[var(--card)]/80 backdrop-blur-md rounded-3xl px-8 py-4 border border-[var(--primary)]/20 shadow-lg shadow-[var(--primary)]/10">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                            <img
                                src="/images/logo2.png"
                                alt="Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="font-semibold text-xl" style={{ color: 'var(--text)' }}>
                            {userData.name}
                        </span>
                    </motion.div>

                    {/* Navigation Links */}
                    <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="hidden md:flex items-center gap-8"
                    >
                        {userData.navLinks.map((link, index) => {
                            const sectionId = link.href.replace('#', '');
                            const isActive = activeSection === sectionId;

                            return (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                >
                                    <a
                                        href={link.href}
                                        className={`transition-colors duration-300 font-medium ${isActive
                                            ? "text-[var(--primary-glow)]"
                                            : "text-[var(--text-soft)] hover:text-[var(--text)]"
                                            }`}
                                    >
                                        {link.name}
                                    </a>
                                </motion.li>
                            );
                        })}
                    </motion.ul>

                    {/* Mobile Menu Button */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="md:hidden text-white p-2"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
}
