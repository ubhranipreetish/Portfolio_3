"use client";

import { userData } from "@/config/userData";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const InfoCard = ({ icon: Icon, label, value }) => {
    return (
        <motion.div
            className="flex items-start gap-4 p-4 rounded-xl border"
            style={{
                backgroundColor: "rgba(17, 26, 44, 0.4)",
                borderColor: "rgba(59, 130, 246, 0.2)",
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{
                borderColor: "var(--primary-glow)",
                backgroundColor: "rgba(17, 26, 44, 0.6)",
            }}
        >
            <div className="p-2 rounded-lg" style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}>
                <Icon className="w-5 h-5" style={{ color: "var(--primary-glow)" }} />
            </div>
            <div className="flex-1">
                <p className="text-xs mb-1" style={{ color: "var(--text-soft)" }}>
                    {label}
                </p>
                <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    {value}
                </p>
            </div>
        </motion.div>
    );
};

export default function Contact() {
    const { contact } = userData;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState({ type: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: "", message: "" });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({
                    type: "success",
                    message: "Message sent successfully! I'll get back to you soon.",
                });
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                setStatus({
                    type: "error",
                    message: data.error || "Something went wrong. Please try again.",
                });
            }
        } catch (error) {
            setStatus({
                type: "error",
                message: "Failed to send message. Please try emailing directly.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="min-h-screen py-20 px-6 pt-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center py-5 mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: "var(--gradient)" }}>
                            {contact.title}
                        </span>
                    </h2>
                    <div className="w-24 h-1 rounded-full mx-auto mb-6" style={{ backgroundImage: "var(--gradient)" }} />
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-soft)" }}>
                        {contact.subtitle}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side */}
                    <motion.div
                        className="space-y-10"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Avatar */}
                        <motion.div
                            className="w-75 h-75 mx-auto rounded-2xl overflow-hidden border shadow-lg"
                            style={{
                                borderColor: "rgba(59, 130, 246, 0.3)",
                                boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)",
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <img
                                src="/your-avatar.png"
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Info Cards */}
                        <div className="space-y-4">
                            <InfoCard icon={Mail} label="Email" value={contact.email} />
                            <InfoCard icon={Phone} label="Phone" value={contact.phone} />
                            <InfoCard icon={MapPin} label="Location" value={contact.location} />
                        </div>
                    </motion.div>

                    {/* Right Side - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Inputs */}
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-soft)" }}>
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all"
                                    style={{
                                        backgroundColor: "var(--card)",
                                        borderColor: "rgba(59, 130, 246, 0.2)",
                                        color: "var(--text)",
                                    }}
                                />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-soft)" }}>
                                    Your Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all"
                                    style={{
                                        backgroundColor: "var(--card)",
                                        borderColor: "rgba(59, 130, 246, 0.2)",
                                        color: "var(--text)",
                                    }}
                                />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-soft)" }}>
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all"
                                    style={{
                                        backgroundColor: "var(--card)",
                                        borderColor: "rgba(59, 130, 246, 0.2)",
                                        color: "var(--text)",
                                    }}
                                />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-soft)" }}>
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none"
                                    style={{
                                        backgroundColor: "var(--card)",
                                        borderColor: "rgba(59, 130, 246, 0.2)",
                                        color: "var(--text)",
                                    }}
                                />
                            </motion.div>

                            {/* Status */}
                            {status.message && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-xl flex items-center gap-3"
                                    style={{
                                        backgroundColor:
                                            status.type === "success"
                                                ? "rgba(34, 197, 94, 0.1)"
                                                : "rgba(239, 68, 68, 0.1)",
                                        borderColor:
                                            status.type === "success"
                                                ? "rgba(34, 197, 94, 0.3)"
                                                : "rgba(239, 68, 68, 0.3)",
                                    }}
                                >
                                    {status.type === "success" ? (
                                        <CheckCircle className="w-5 h-5" style={{ color: "#22c55e" }} />
                                    ) : (
                                        <XCircle className="w-5 h-5" style={{ color: "#ef4444" }} />
                                    )}
                                    <p className="text-sm">{status.message}</p>
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                style={{
                                    background: "var(--gradient)",
                                    color: "white",
                                }}
                                whileHover={{ scale: isSubmitting ? 1 : 1.02, boxShadow: "var(--glow-1)" }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.div
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                {/* Floating Decorative Elements */}
                <motion.div
                    className="absolute top-20 right-10 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ background: "var(--gradient)" }}
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute bottom-20 left-10 w-24 h-24 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, var(--secondary), var(--primary))" }}
                    animate={{
                        y: [0, 20, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>
        </section>
    );
}
