import Reveal from "./Reveal";

export default function SectionHeading({ label, title }) {
    return (
        <Reveal>
            <div className="border-b border-line pb-6">
                <span className="mono-label">{label}</span>
            </div>
            {title && (
                <h2 className="display mt-10 text-4xl text-ink sm:text-5xl lg:text-6xl">
                    {title}
                </h2>
            )}
        </Reveal>
    );
}
