"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { userData } from "@/config/userData";

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    // Creative floating animations
    const floatingElements = [
        {
            id: 1,
            className: "absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-xl opacity-60",
            animate: {
                y: [0, -30, 0],
                x: [0, 15, 0],
                scale: [1, 1.2, 1],
            },
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        },
        {
            id: 2,
            className: "absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-50",
            animate: {
                y: [0, 40, 0],
                x: [0, -20, 0],
                rotate: [0, 180, 360],
            },
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        },
        {
            id: 3,
            className: "absolute top-1/4 -right-12 w-16 h-16 bg-gradient-to-bl from-yellow-500 to-orange-500 rounded-lg blur-lg opacity-40",
            animate: {
                y: [0, -20, 0],
                rotate: [0, 90, 0],
                scale: [1, 0.8, 1],
            },
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
        },
        {
            id: 4,
            className: "absolute bottom-1/3 -left-6 w-24 h-24 bg-gradient-to-tr from-green-500 to-teal-500 opacity-30 blur-xl",
            style: { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
            animate: {
                y: [0, 25, 0],
                x: [0, -15, 0],
                rotate: [0, -180, -360],
            },
            transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
        },
        {
            id: 5,
            className: "absolute top-1/2 right-8 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-md opacity-50",
            animate: {
                y: [0, -35, 0],
                x: [0, 20, 0],
                scale: [1, 1.5, 1],
            },
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
        },
        {
            id: 6,
            className: "absolute -top-8 left-1/4 w-28 h-28 bg-gradient-to-r from-rose-500 to-pink-500 opacity-25 blur-2xl",
            style: { clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" },
            animate: {
                rotate: [0, 360],
                scale: [1, 1.1, 1],
            },
            transition: { duration: 10, repeat: Infinity, ease: "linear" }
        }
    ];

    return (
        <section id="home" className="relative min-h-screen flex items-center py-20 px-6 md:px-12">
            <div className="max-w-7xl w-full mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        {/* Tagline */}
                        <motion.p
                            variants={itemVariants}
                            className="text-lg font-medium"
                            style={{ color: 'var(--primary-glow)' }}
                        >
                            {userData.tagline}
                        </motion.p>

                        {/* Main Heading */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-6xl md:text-7xl font-bold leading-tight"
                            style={{ color: 'var(--text)' }}
                        >
                            Hello, my
                            <br />
                            name is {" "}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient)' }}>
                                {userData.firstName}.
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-lg leading-relaxed max-w-md"
                            style={{ color: 'var(--text-soft)' }}
                        >
                            {userData.description}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <motion.a
                                href={userData.cta.primary.href}
                                download
                                whileHover={{ scale: 1.05, boxShadow: "var(--glow-1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
                                style={{ background: 'var(--gradient)' }}
                            >
                                {userData.cta.primary.text}
                            </motion.a>

                            <motion.a
                                href={userData.cta.secondary.href}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border-2 font-semibold rounded-full backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
                                style={{ borderColor: 'var(--text-soft)', color: 'var(--text)' }}
                            >
                                {userData.cta.secondary.text}
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </motion.a>
                        </motion.div>

                        {/* Scroll Indicator */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-3 pt-8"
                        >
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-8 h-12 border-2 rounded-full flex items-start justify-center p-2"
                                style={{ borderColor: 'var(--text-soft)' }}
                            >
                                <motion.div
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: 'var(--primary-glow)' }}
                                    animate={{ y: [0, 16, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </motion.div>
                            <span className="text-sm" style={{ color: 'var(--text-soft)' }}>Scroll down</span>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Profile Image */}
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative flex items-center justify-center"
                    >
                        {/* Decorative Elements */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="w-[450px] h-[450px] border-2 rounded-full" style={{ borderColor: 'rgba(76, 201, 240, 0.2)' }} />
                        </motion.div>

                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="w-[380px] h-[380px] border-2 rounded-full" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }} />
                        </motion.div>

                        {/* 3D Triangle/Shape */}
                        <motion.div
                            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-12 left-12 w-24 h-24"
                        >
                            <div className="w-full h-full opacity-80"
                                style={{
                                    background: 'linear-gradient(to bottom right, var(--primary-glow), var(--primary))',
                                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                                    filter: "blur(1px)",
                                }}
                            />
                        </motion.div>

                        {/* 3D Cube */}
                        <motion.div
                            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute bottom-24 left-8 w-20 h-20 rounded-lg opacity-80"
                            style={{
                                background: 'linear-gradient(to bottom right, var(--primary), var(--secondary))',
                                transform: "perspective(500px) rotateX(15deg) rotateY(15deg)"
                            }}
                        />

                        {/* Profile Image Container */}
                        <div className="relative z-10">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-[400px] h-[500px] rounded-[40px] overflow-hidden border-4 shadow-2xl"
                                style={{
                                    borderColor: 'var(--card)',
                                    background: 'linear-gradient(to bottom right, var(--background-2), var(--background))'
                                }}
                            >
                                {/* Placeholder for profile image */}
                                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, rgba(76, 201, 240, 0.1), rgba(59, 130, 246, 0.1))' }}>
                                    <svg
                                        className="w-32 h-32"
                                        style={{ color: 'var(--text-soft)', opacity: 0.3 }}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <Image
                                    src={userData.profileImage}
                                    alt={userData.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>



                {/* Up Arrow - Fixed Bottom Right */}
                <motion.a
                    href="#home"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                    style={{ background: 'var(--primary)', boxShadow: 'var(--glow-1)' }}
                >
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </motion.a>
            </div>
        </section>
    );
}
