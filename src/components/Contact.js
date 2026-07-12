"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { userData } from "@/config/userData";
import SectionIntro from "./SectionIntro";
import Reveal from "./Reveal";

const inputClass =
    "w-full rounded-lg border border-line bg-card px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors focus:border-accent focus:outline-none";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error

    const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("send failed");
            setStatus("sent");
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch {
            setStatus("error");
        }
    }

    return (
        <section id="contact" className="scroll-mt-24">
            <SectionIntro title="Contact" />

            <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-6 sm:gap-16 sm:pb-20 sm:pt-10 lg:grid-cols-2 lg:pb-28">
                {/* Left — pitch */}
                <div>
                    <Reveal>
                        <p className="display text-4xl text-ink sm:text-5xl">
                            Let's build something that{" "}
                            <span className="font-serif-accent text-accent">thinks.</span>
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mt-6 max-w-md leading-relaxed text-muted">{userData.contact.sub}</p>
                    </Reveal>

                    <Reveal delay={0.18}>
                        <a
                            href={`mailto:${userData.email}`}
                            className="link-sweep mt-10 inline-block pb-1 font-mono text-lg text-ink transition-colors hover:text-accent sm:text-xl"
                        >
                            {userData.email}
                        </a>
                    </Reveal>

                    <Reveal delay={0.26}>
                        <ul className="mt-12 space-y-4">
                            {userData.contact.socials.map((s) => (
                                <li key={s.name}>
                                    <a
                                        href={s.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between border-b border-line pb-4 transition-colors hover:border-line-strong"
                                    >
                                        <span className="text-sm text-ink">{s.name}</span>
                                        <span className="flex items-center gap-2 font-mono text-xs text-muted transition-colors group-hover:text-accent">
                                            {s.handle}
                                            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>

                {/* Right — form */}
                <Reveal delay={0.15}>
                    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="contact-name" className="mono-label mb-2 block">Name</label>
                                <input
                                    id="contact-name" type="text" required value={form.name}
                                    onChange={update("name")} placeholder="Ada Lovelace"
                                    className={inputClass} autoComplete="name"
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-email" className="mono-label mb-2 block">Email</label>
                                <input
                                    id="contact-email" type="email" required value={form.email}
                                    onChange={update("email")} placeholder="you@company.com"
                                    className={inputClass} autoComplete="email"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="contact-subject" className="mono-label mb-2 block">Subject</label>
                            <input
                                id="contact-subject" type="text" required value={form.subject}
                                onChange={update("subject")} placeholder="Role, project, or idea"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label htmlFor="contact-message" className="mono-label mb-2 block">Message</label>
                            <textarea
                                id="contact-message" required rows={6} value={form.message}
                                onChange={update("message")}
                                placeholder="What are we building?"
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-bg transition-all hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
                        >
                            {status === "sending" && <Loader2 size={15} className="animate-spin" />}
                            {status === "sending" ? "Sending…" : "Send message"}
                        </button>

                        <p role="status" aria-live="polite" className="min-h-5 font-mono text-xs">
                            {status === "sent" && (
                                <span className="text-accent">Message received — I'll reply within 24 hours.</span>
                            )}
                            {status === "error" && (
                                <span className="text-red-400">
                                    Something broke. Email me directly at {userData.email}.
                                </span>
                            )}
                        </p>
                    </form>
                </Reveal>
            </div>
        </section>
    );
}
