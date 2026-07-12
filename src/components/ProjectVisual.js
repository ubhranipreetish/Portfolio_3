import ProjectShot from "./ProjectShot";
// import ProjectMotif from "./ProjectMotif";

/*
 * Project artwork — framed product screenshot (see ProjectShot).
 * ProjectShot falls back to the generative motif automatically when a
 * project has no screenshot yet.
 */
export default function ProjectVisual({ project }) {
    return <ProjectShot project={project} />;
}

/* ── Previous treatment — generative motif in the glow frame.
      Kept for reference; re-enable by swapping the return above. ──────

export default function ProjectVisualMotif({ project }) {
    return (
        <div className="motif-frame relative overflow-hidden rounded-xl border border-line">
            <ProjectMotif motif={project.motif} title={project.title} />
        </div>
    );
}
*/
