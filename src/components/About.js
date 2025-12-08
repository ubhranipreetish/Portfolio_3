"use client";

import { userData } from "@/config/userData";
import { motion } from "framer-motion";
import { Code2, Database, Cpu, Palette, GitBranch, MessageSquare, Users, Target, Clock, Lightbulb } from "lucide-react";

const SkillTag = ({ skill }) => {
  return (
    <motion.div
      className="px-4 py-2 rounded-lg border transition-all cursor-default"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        color: 'var(--text)'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{
        scale: 1.05,
        borderColor: 'var(--primary-glow)',
        boxShadow: '0 0 15px rgba(76, 201, 240, 0.3)'
      }}
    >
      <span className="text-sm font-medium">{skill.name}</span>
    </motion.div>
  );
};

const TechIcon = ({ tech, icon: Icon }) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 p-4 rounded-lg border transition-all cursor-pointer group"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'rgba(59, 130, 246, 0.2)'
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
        borderColor: 'var(--primary-glow)',
        boxShadow: 'var(--glow-1)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" style={{ color: 'var(--primary-glow)' }} />
      <span className="text-xs group-hover:scale-105 transition-all" style={{ color: 'var(--text-soft)' }}>
        {tech.name}
      </span>
    </motion.div>
  );
};

const SkillCategory = ({ title, skills, icon: Icon }) => {
  return (
    <motion.div
      className="p-6 rounded-xl border"
      style={{
        backgroundColor: 'rgba(17, 26, 44, 0.4)',
        borderColor: 'rgba(59, 130, 246, 0.2)'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6" style={{ color: 'var(--primary-glow)' }} />
        <h3 className="text-xl font-semibold text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient)' }}>
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <SkillTag key={index} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
};

// Icon mapping for tech stack and tools
const iconMap = {
  "React": Code2,
  "Next.js": Code2,
  "Node.js": Cpu,
  "TensorFlow": Cpu,
  "Python": Code2,
  "TypeScript": Code2,
  "VS Code": Code2,
  "Figma": Palette,
  "GitHub": GitBranch,
  "AWS": Database,
  "Docker": Database,
  "Postman": Database,
};

export default function About() {
  const { about } = userData;

  return (
    <section id="about" className="min-h-screen py-20 px-6 pt-24">
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
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 rounded-full mx-auto" style={{ backgroundImage: 'var(--gradient)' }} />
        </motion.div>

        {/* Story Section */}
        <motion.div
          className="mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg leading-relaxed mb-6 text-center" style={{ color: 'var(--text-soft)' }}>
            {about.story}
          </p>
          <p className="text-2xl font-semibold text-center text-transparent bg-clip-text italic" style={{ backgroundImage: 'var(--gradient)' }}>
            "{about.mission}"
          </p>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text)' }}>
            Tech Stack
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {about.techStack.map((tech, index) => (
              <TechIcon key={index} tech={tech} icon={iconMap[tech.name] || Code2} />
            ))}
          </div>
        </motion.div>

        {/* Tools Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text)' }}>
            Tools I Use
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {about.tools.map((tool, index) => (
              <TechIcon key={index} tech={tool} icon={iconMap[tool.name] || Palette} />
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-10 text-center" style={{ color: 'var(--text)' }}>
            Skills & Expertise
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCategory title="Frontend Development" skills={about.skills.frontend} icon={Code2} />
            <SkillCategory title="Backend Development" skills={about.skills.backend} icon={Cpu} />
            <SkillCategory title="Databases" skills={about.skills.databases} icon={Database} />
            <SkillCategory title="Machine Learning" skills={about.skills.machineLearning} icon={Lightbulb} />
            <SkillCategory title="Tools & Technologies" skills={about.skills.tools} icon={GitBranch} />
            <SkillCategory title="Soft Skills" skills={about.skills.softSkills} icon={Users} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
