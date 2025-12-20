"use client";

import { userData } from "@/config/userData";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
    const { contact, name, navLinks } = userData;
    const currentYear = new Date().getFullYear();

    const socialIcons = {
        github: Github,
        linkedin: Linkedin,
        twitter: Twitter,
        instagram: Instagram,
    };

    return (
        <footer className="relative border-t py-12 px-6" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
                                style={{ background: 'var(--gradient)' }}
                            >
                                <img
                                    src="/images/logo2.png"
                                    alt="Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
                                {name}
                            </h3>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                            {contact.subtitle}
                        </p>
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-soft)' }}>
                            <MapPin className="w-4 h-4" style={{ color: 'var(--primary-glow)' }} />
                            {contact.location}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            {navLinks.map((link, index) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <a
                                        href={link.href}
                                        className="text-sm transition-colors hover:translate-x-1 inline-block"
                                        style={{ color: 'var(--text-soft)' }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--primary-glow)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--text-soft)'}
                                    >
                                        {link.name}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services/Skills */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
                            Services
                        </h4>
                        <ul className="space-y-2">
                            {['Web Development', 'UI/UX Design', 'Machine Learning', 'Mobile Apps', 'Consulting'].map((service, index) => (
                                <motion.li
                                    key={service}
                                    className="text-sm"
                                    style={{ color: 'var(--text-soft)' }}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {service}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact & Social */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h4 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
                            Connect
                        </h4>
                        <div className="space-y-3">
                            <a
                                href={`mailto:${contact.email}`}
                                className="flex items-center gap-2 text-sm transition-colors group"
                                style={{ color: 'var(--text-soft)' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-glow)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-soft)'}
                            >
                                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="truncate">{contact.email}</span>
                            </a>

                            {/* Social Icons */}
                            <div className="flex gap-3 pt-2">
                                {contact.socialMedia.map((platform, index) => {
                                    const Icon = socialIcons[platform.icon] || Mail;
                                    return (
                                        <motion.a
                                            key={platform.name}
                                            href={platform.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg border transition-all"
                                            style={{
                                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                                borderColor: 'rgba(59, 130, 246, 0.2)'
                                            }}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{
                                                scale: 1.1,
                                                borderColor: 'var(--primary-glow)',
                                                boxShadow: '0 0 15px rgba(76, 201, 240, 0.3)'
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label={platform.name}
                                        >
                                            <Icon className="w-5 h-5" style={{ color: 'var(--primary-glow)' }} />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.div
                    className="h-px mb-6"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.3), transparent)' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                />

                {/* Bottom Bar */}
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-between gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <p className="text-sm flex items-center gap-1" style={{ color: 'var(--text-soft)' }}>
                        <span>© {currentYear} {name}.</span>
                        <span>All rights reserved.</span>
                    </p>

                </motion.div>
            </div>

            {/* Decorative Gradient */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 blur-3xl opacity-10 pointer-events-none"
                style={{ background: 'var(--gradient)' }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </footer>
    );
}
