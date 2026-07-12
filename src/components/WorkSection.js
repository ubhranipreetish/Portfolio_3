import SectionIntro from "./SectionIntro";
import WorkSplit from "./WorkSplit";
import WorkMobile from "./WorkMobile";

/* Featured Work — desktop split-screen index, mobile pinned card deck. */
export default function WorkSection() {
    return (
        <section id="work" className="scroll-mt-24">
            <SectionIntro
                title="Featured Work"
                subtitle={
                    <>
                        Five flagship builds — each one proof of a different discipline, from{" "}
                        <span className="font-serif-accent text-accent">
                            agentic AI to systems design.
                        </span>
                    </>
                }
            />
            {/* Desktop — split-screen index */}
            <div className="hidden lg:block">
                <WorkSplit />
            </div>
            {/* Mobile — pinned card deck */}
            <div className="lg:hidden">
                <WorkMobile />
            </div>
        </section>
    );
}
