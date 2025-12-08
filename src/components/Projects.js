"use client";

import { userData } from "@/config/userData";
import { motion, useAnimation } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative rounded-2xl overflow-hidden border"
            style={{
                backgroundColor: 'var(--card)',
                borderColor: 'rgba(59, 130, 246, 0.2)'
            }}
        >
            {/* Image Container with Overlay */}
            <div className="relative h-64 overflow-hidden">
                {/* Gradient Overlay */}
                <motion.div
                    className="absolute inset-0 z-10"
                    style={{
                        background: 'linear-gradient(to bottom, transparent, rgba(10, 15, 31, 0.9))'
                    }}
                    animate={{
                        opacity: isHovered ? 0.7 : 1
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Category Badge */}
                <motion.div
                    className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                    style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        color: 'var(--primary-glow)',
                        borderWidth: '1px',
                        borderColor: 'var(--primary-glow)'
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                >
                    {project.category}
                </motion.div>

                {/* Project Image */}
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{
                        scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.4 }}
                />

                {/* Action Buttons - Appear on Hover */}
                <motion.div
                    className="absolute inset-0 z-20 flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full backdrop-blur-md border"
                        style={{
                            backgroundColor: 'rgba(59, 130, 246, 0.2)',
                            borderColor: 'var(--primary-glow)'
                        }}
                        whileHover={{ scale: 1.1, boxShadow: 'var(--glow-1)' }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Github className="w-5 h-5" style={{ color: 'var(--text)' }} />
                    </motion.a>
                    <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full backdrop-blur-md border"
                        style={{
                            backgroundColor: 'rgba(76, 201, 240, 0.2)',
                            borderColor: 'var(--primary-glow)'
                        }}
                        whileHover={{ scale: 1.1, boxShadow: 'var(--glow-2)' }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ExternalLink className="w-5 h-5" style={{ color: 'var(--text)' }} />
                    </motion.a>
                </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Title */}
                <motion.h3
                    className="text-xl font-bold"
                    style={{ color: 'var(--text)' }}
                    animate={{
                        color: isHovered ? 'var(--primary-glow)' : 'var(--text)'
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {project.title}
                </motion.h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                        <motion.span
                            key={tagIndex}
                            className="px-3 py-1 rounded-lg text-xs font-medium border"
                            style={{
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                borderColor: 'rgba(59, 130, 246, 0.3)',
                                color: 'var(--text-soft)'
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                            whileHover={{
                                borderColor: 'var(--primary-glow)',
                                color: 'var(--primary-glow)',
                                scale: 1.05
                            }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* Animated Border Glow on Hover */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'transparent'
                }}
                animate={{
                    borderColor: isHovered ? 'var(--primary-glow)' : 'transparent',
                    boxShadow: isHovered ? 'var(--glow-1)' : '0 0 0 rgba(0,0,0,0)'
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

const FilterButton = ({ category, active, onClick }) => {
    return (
        <motion.button
            onClick={onClick}
            className="px-6 py-2 rounded-full font-medium transition-all border cursor-pointer"
            style={{
                backgroundColor: active ? 'var(--primary)' : 'rgba(59, 130, 246, 0.1)',
                borderColor: active ? 'var(--primary-glow)' : 'rgba(59, 130, 246, 0.3)',
                color: active ? 'white' : 'var(--text-soft)',
                boxShadow: active ? 'var(--glow-1)' : 'none'
            }}
            whileHover={{
                scale: 1.05,
                borderColor: 'var(--primary-glow)'
            }}
            whileTap={{ scale: 0.95 }}
        >
            {category}
        </motion.button>
    );
};

export default function Projects() {
    const { projects } = userData;
    const [activeFilter, setActiveFilter] = useState("All");

    const categories = ["All", "Full Stack", "Frontend"];

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(project => project.category === activeFilter);

    return (
        <section id="projects" className="min-h-screen py-20 px-6 pt-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center py-5"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient)' }}>
                            My Projects
                        </span>
                    </h2>
                    <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundImage: 'var(--gradient)' }} />
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-soft)' }}>
                        Explore my recent work and side projects. Each one represents a unique challenge and learning experience.
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {categories.map((category, index) => (
                        <FilterButton
                            key={category}
                            category={category}
                            active={activeFilter === category}
                            onClick={() => setActiveFilter(category)}
                        />
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    layout
                >
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-xl" style={{ color: 'var(--text-soft)' }}>
                            No projects found in this category.
                        </p>
                    </motion.div>
                )}

                {/* Decorative Elements */}
                <motion.div
                    className="absolute top-20 right-20 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ background: 'var(--gradient)' }}
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute bottom-40 left-20 w-24 h-24 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [360, 180, 0]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
        </section>
    );
}
