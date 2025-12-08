"use client";

import { userData } from "@/config/userData";
import { motion } from "framer-motion";
import { Code, Palette, Plug, Brain, Zap, Wrench, Gauge, Check, Sparkles } from "lucide-react";
import { useState } from "react";

const ServiceCard = ({ service, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    const iconMap = {
        code: Code,
        palette: Palette,
        plug: Plug,
        brain: Brain,
        zap: Zap,
        wrench: Wrench,
        gauge: Gauge,
    };

    const Icon = iconMap[service.icon] || Code;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group"
        >
            <motion.div
                className="h-full p-8 rounded-2xl border backdrop-blur-sm"
                style={{
                    backgroundColor: 'rgba(17, 26, 44, 0.4)',
                    borderColor: 'rgba(59, 130, 246, 0.2)'
                }}
                animate={{
                    borderColor: isHovered ? 'var(--primary-glow)' : 'rgba(59, 130, 246, 0.2)',
                    backgroundColor: isHovered ? 'rgba(17, 26, 44, 0.6)' : 'rgba(17, 26, 44, 0.4)'
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Icon with Gradient Background */}
                <motion.div
                    className="relative mb-6 inline-block"
                    animate={{
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="absolute inset-0 rounded-xl blur-xl opacity-50"
                        style={{ background: 'var(--gradient)' }}
                        animate={{
                            opacity: isHovered ? 0.7 : 0.3,
                            scale: isHovered ? 1.2 : 1
                        }}
                    />
                    <div
                        className="relative w-16 h-16 rounded-xl flex items-center justify-center"
                        style={{ background: 'var(--gradient)' }}
                    >
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                    {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-soft)' }}>
                    {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                        <motion.div
                            key={featureIndex}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                        >
                            <motion.div
                                animate={{
                                    scale: isHovered ? 1.1 : 1
                                }}
                            >
                                <Check className="w-4 h-4" style={{ color: 'var(--primary-glow)' }} />
                            </motion.div>
                            <span className="text-sm" style={{ color: 'var(--text-soft)' }}>
                                {feature}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(76, 201, 240, 0.1), transparent)'
                    }}
                    animate={{
                        opacity: isHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Corner Accent */}
                <motion.div
                    className="absolute top-0 right-0 w-20 h-20 rounded-2xl opacity-20"
                    style={{
                        background: 'var(--gradient)',
                        filter: 'blur(30px)'
                    }}
                    animate={{
                        opacity: isHovered ? 0.4 : 0.2,
                        scale: isHovered ? 1.5 : 1
                    }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </motion.div>
    );
};

export default function Services() {
    const { services } = userData;

    return (
        <section id="services" className="min-h-screen py-20 px-6 pt-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center py-5 mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    

                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient)' }}>
                            {services.title}
                        </span>
                    </h2>
                    <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundImage: 'var(--gradient)' }} />
                    <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--text-soft)' }}>
                        {services.subtitle}
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.offerings.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>


                {/* Floating Background Elements */}
                <motion.div
                    className="absolute top-1/4 -left-20 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
                    style={{ background: 'var(--gradient)' }}
                    animate={{
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, var(--secondary), var(--primary))' }}
                    animate={{
                        y: [0, -50, 0],
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Grid Pattern Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-5"
                    style={{
                        backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px),
                            linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>
        </section>
    );
}
