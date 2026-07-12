import SectionIntro from "./SectionIntro";
import CapabilitiesIndex from "./CapabilitiesIndex";

export default function Capabilities() {
    return (
        <section id="capabilities" className="scroll-mt-24">
            <SectionIntro
                title="Capabilities"
                subtitle={
                    <>
                        One engineer,{" "}
                        <span className="font-serif-accent text-accent">
                            four paths.
                        </span>
                    </>
                }
                meta="04 PATHS"
            />

            <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 sm:pt-10 lg:pb-24 lg:pt-14">
                <CapabilitiesIndex />
            </div>
        </section>
    );
}
