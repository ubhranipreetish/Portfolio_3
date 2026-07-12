import Reveal from "./Reveal";
import KineticTitle from "./KineticTitle";

/*
 * Shared section header — a divider rule (with optional meta on the right),
 * the drifting kinetic title, then a subtitle. The kinetic title is the
 * single, styled section name; a visually-hidden h2 carries it for a11y.
 */
export default function SectionIntro({ title, subtitle, meta }) {
    return (
        <div className="pt-14 sm:pt-20 lg:pt-28">
            <div className="mx-auto max-w-7xl px-6">
                <Reveal>
                    <div className="flex items-baseline justify-end border-b border-line pb-4">
                        {meta ? (
                            <span className="font-mono text-xs text-faint">{meta}</span>
                        ) : (
                            <span aria-hidden="true">&nbsp;</span>
                        )}
                    </div>
                </Reveal>
            </div>

            <KineticTitle text={title} />

            {subtitle ? (
                <div className="mx-auto max-w-7xl px-6">
                    <Reveal>
                        <p className="max-w-4xl text-2xl leading-snug text-muted sm:text-3xl lg:text-4xl">
                            {subtitle}
                        </p>
                    </Reveal>
                </div>
            ) : null}

            <h2 className="sr-only">{title}</h2>
        </div>
    );
}
