import { userData } from "@/config/userData";

export default function Footer() {
    return (
        <footer className="border-t border-line">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
                <p className="font-mono text-xs text-faint">
                    © {new Date().getFullYear()} {userData.name} — designed & engineered by hand
                </p>
                <div className="flex items-center gap-6">
                    {userData.contact.socials.map((s) => (
                        <a
                            key={s.name}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-faint transition-colors hover:text-accent"
                        >
                            {s.name}
                        </a>
                    ))}
                    <a
                        href="#top"
                        className="font-mono text-xs text-faint transition-colors hover:text-accent"
                    >
                        Top ↑
                    </a>
                </div>
            </div>
        </footer>
    );
}
