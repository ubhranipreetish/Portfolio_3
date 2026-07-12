/*
 * Generative SVG artwork for each flagship project.
 * Deterministic (seeded PRNG, computed at module load) so SSR and
 * client renders always match. One visual metaphor per system:
 *   montecarlo   → fan of simulation trajectories
 *   agentgraph   → stateful agent graph with conditional routing
 *   floorgrid    → POS floor of tables in three occupancy states
 *   flightroutes → flight arcs over a delay histogram
 *   arena        → wave-based arena with radial spawn rings
 */

function mulberry32(seed) {
    let a = seed;
    return function () {
        a |= 0; a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const STROKE = "rgba(235,235,225,0.22)";
const STROKE_FAINT = "rgba(235,235,225,0.10)";
const ACCENT = "var(--color-accent, #c9f24b)";

/* ── Monte Carlo trajectory fan ── */
const mcPaths = (() => {
    const rand = mulberry32(42);
    const paths = [];
    for (let i = 0; i < 14; i++) {
        const drift = (rand() - 0.45) * 150;
        const wobble = 12 + rand() * 26;
        let d = "M 60 200";
        let y = 200;
        for (let x = 130; x <= 540; x += 70) {
            y += drift / 7 + (rand() - 0.5) * wobble;
            y = Math.max(40, Math.min(360, y));
            d += ` L ${x} ${Math.round(y)}`;
        }
        paths.push({ d, endY: Math.round(y) });
    }
    return paths;
})();

function MonteCarlo() {
    return (
        <g>
            {[80, 140, 200, 260, 320].map((y) => (
                <line key={y} x1="60" y1={y} x2="540" y2={y} stroke={STROKE_FAINT} strokeWidth="1" />
            ))}
            {mcPaths.map((p, i) => (
                <path key={i} d={p.d} fill="none" stroke={STROKE} strokeWidth="1.2" />
            ))}
            <path d={mcPaths[6].d} fill="none" stroke={ACCENT} strokeWidth="2" className="motif-flow" />
            {mcPaths.map((p, i) => (
                <circle key={i} cx="540" cy={p.endY} r="3" fill={i === 6 ? ACCENT : STROKE} />
            ))}
            <circle cx="60" cy="200" r="5" fill={ACCENT} className="motif-pulse" />
            <text x="60" y="385" fill="var(--color-faint)" fontSize="11" fontFamily="var(--font-geist-mono)">
                n=500 · ball 13.2 → override
            </text>
        </g>
    );
}

/* ── Agentic state graph ── */
function AgentGraph() {
    const nodes = [
        { id: "in", x: 70, y: 200, label: "input" },
        { id: "ml", x: 190, y: 200, label: "predict" },
        { id: "std", x: 310, y: 110, label: "rag" },
        { id: "deep", x: 310, y: 290, label: "rag+" },
        { id: "llm", x: 430, y: 200, label: "decide" },
        { id: "ref", x: 430, y: 330, label: "reflect" },
        { id: "out", x: 540, y: 200, label: "out" },
    ];
    const edges = [
        ["in", "ml", false], ["ml", "std", false], ["ml", "deep", true],
        ["std", "llm", false], ["deep", "llm", true], ["llm", "out", false],
        ["llm", "ref", true], ["ref", "llm", true],
    ];
    const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
    return (
        <g>
            {edges.map(([a, b, dashed], i) => (
                <line
                    key={i}
                    x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y}
                    stroke={dashed ? STROKE : "rgba(235,235,225,0.3)"}
                    strokeWidth="1.2"
                    strokeDasharray={dashed ? "4 5" : "none"}
                />
            ))}
            <path
                d={`M ${byId.in.x} ${byId.in.y} L ${byId.ml.x} ${byId.ml.y} L ${byId.deep.x} ${byId.deep.y} L ${byId.llm.x} ${byId.llm.y} L ${byId.out.x} ${byId.out.y}`}
                fill="none" stroke={ACCENT} strokeWidth="1.6" className="motif-flow"
            />
            {nodes.map((n) => (
                <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r="17" fill="var(--color-card)" stroke={n.id === "llm" ? ACCENT : "rgba(235,235,225,0.35)"} strokeWidth="1.4" />
                    <text x={n.x} y={n.y + 34} textAnchor="middle" fill="var(--color-faint)" fontSize="10" fontFamily="var(--font-geist-mono)">
                        {n.label}
                    </text>
                </g>
            ))}
            <circle cx={byId.llm.x} cy={byId.llm.y} r="6" fill={ACCENT} className="motif-pulse" />
            <text x="70" y="60" fill="var(--color-faint)" fontSize="11" fontFamily="var(--font-geist-mono)">
                confidence &lt; 0.70 → reflect
            </text>
        </g>
    );
}

/* ── POS floor grid ── */
const floorStates = (() => {
    const rand = mulberry32(7);
    return Array.from({ length: 24 }, () => {
        const r = rand();
        return r < 0.5 ? "vacant" : r < 0.82 ? "occupied" : "bill";
    });
})();

function FloorGrid() {
    return (
        <g>
            {floorStates.map((state, i) => {
                const col = i % 6;
                const row = Math.floor(i / 6);
                const x = 78 + col * 76;
                const y = 64 + row * 70;
                const isAccent = state === "occupied";
                return (
                    <g key={i}>
                        <rect
                            x={x} y={y} width="56" height="50" rx="8"
                            fill={isAccent ? "rgba(201,242,75,0.10)" : "transparent"}
                            stroke={isAccent ? ACCENT : state === "bill" ? "rgba(235,235,225,0.5)" : STROKE}
                            strokeWidth="1.3"
                            className={isAccent && i % 5 === 0 ? "motif-pulse" : undefined}
                        />
                        <circle cx={x + 46} cy={y + 10} r="2.5" fill={isAccent ? ACCENT : state === "bill" ? "rgba(235,235,225,0.6)" : "rgba(235,235,225,0.2)"} />
                    </g>
                );
            })}
            <text x="78" y="370" fill="var(--color-faint)" fontSize="11" fontFamily="var(--font-geist-mono)">
                ● occupied&nbsp;&nbsp;○ vacant&nbsp;&nbsp;◍ bill ready
            </text>
        </g>
    );
}

/* ── Flight arcs + delay bars ── */
const flightBars = (() => {
    const rand = mulberry32(99);
    return Array.from({ length: 22 }, () => 14 + rand() * 70);
})();

function FlightRoutes() {
    const airports = [80, 175, 265, 360, 445, 530];
    const arcs = [
        [0, 3, false], [1, 4, true], [0, 5, false], [2, 5, false], [1, 3, false], [2, 4, false],
    ];
    return (
        <g>
            <line x1="60" y1="250" x2="545" y2="250" stroke={STROKE} strokeWidth="1" />
            {arcs.map(([a, b, hot], i) => {
                const x1 = airports[a], x2 = airports[b];
                const mid = (x1 + x2) / 2;
                const lift = Math.abs(x2 - x1) * 0.45;
                return (
                    <path
                        key={i}
                        d={`M ${x1} 250 Q ${mid} ${250 - lift} ${x2} 250`}
                        fill="none"
                        stroke={hot ? ACCENT : STROKE}
                        strokeWidth={hot ? 1.8 : 1.2}
                        className={hot ? "motif-flow" : undefined}
                    />
                );
            })}
            {airports.map((x, i) => (
                <circle key={i} cx={x} cy="250" r="3.5" fill={i === 1 || i === 4 ? ACCENT : "rgba(235,235,225,0.45)"} />
            ))}
            {flightBars.map((h, i) => (
                <rect
                    key={i}
                    x={70 + i * 21} y={345 - h} width="11" height={h} rx="2"
                    fill={i === 13 ? ACCENT : "rgba(235,235,225,0.16)"}
                />
            ))}
            <text x="70" y="380" fill="var(--color-faint)" fontSize="11" fontFamily="var(--font-geist-mono)">
                arr_delay ~ dep_delay · R²=0.934
            </text>
        </g>
    );
}

/* ── Wave arena ── */
const arenaDots = (() => {
    const rand = mulberry32(13);
    return Array.from({ length: 26 }, () => {
        const angle = rand() * Math.PI * 2;
        const radius = 55 + rand() * 110;
        return {
            x: 300 + Math.cos(angle) * radius * 1.15,
            y: 200 + Math.sin(angle) * radius * 0.78,
            big: rand() > 0.8,
        };
    });
})();

function Arena() {
    return (
        <g>
            <g className="motif-spin" style={{ transformBox: "fill-box" }}>
                {[60, 105, 150].map((r) => (
                    <ellipse key={r} cx="300" cy="200" rx={r * 1.15} ry={r * 0.78} fill="none" stroke={STROKE} strokeWidth="1" strokeDasharray="3 6" />
                ))}
            </g>
            {arenaDots.map((d, i) => (
                <circle
                    key={i}
                    cx={Math.round(d.x)} cy={Math.round(d.y)} r={d.big ? 4.5 : 2.5}
                    fill={d.big ? "transparent" : "rgba(235,235,225,0.4)"}
                    stroke={d.big ? "rgba(235,235,225,0.6)" : "none"}
                    strokeWidth="1.2"
                />
            ))}
            <line x1="285" y1="200" x2="315" y2="200" stroke={ACCENT} strokeWidth="1.6" />
            <line x1="300" y1="185" x2="300" y2="215" stroke={ACCENT} strokeWidth="1.6" />
            <circle cx="300" cy="200" r="11" fill="none" stroke={ACCENT} strokeWidth="1.6" className="motif-pulse" />
            <text x="78" y="370" fill="var(--color-faint)" fontSize="11" fontFamily="var(--font-geist-mono)">
                wave 15 · entities: 1024 · 60fps
            </text>
        </g>
    );
}

/* ── Hold'em table (authoritative server + 6 seats) ── */
const holdemSeats = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return {
        x: Math.round(300 + Math.cos(a) * 205),
        y: Math.round(200 + Math.sin(a) * 122),
    };
});

function Holdem() {
    return (
        <g>
            {/* Table rail + inner betting line */}
            <ellipse cx="300" cy="200" rx="182" ry="102" fill="none" stroke={STROKE} strokeWidth="1.4" />
            <ellipse cx="300" cy="200" rx="146" ry="74" fill="none" stroke={STROKE_FAINT} strokeWidth="1" strokeDasharray="4 6" />

            {/* Community cards — flop revealed, turn & river face down */}
            {[0, 1, 2, 3, 4].map((i) => (
                <rect
                    key={i}
                    x={241 + i * 25} y={187} width="19" height="27" rx="3"
                    fill="var(--color-card)"
                    stroke={i < 3 ? "rgba(235,235,225,0.55)" : STROKE}
                    strokeWidth="1.2"
                />
            ))}

            {/* Pot — chip stack above the board */}
            {[0, 1, 2].map((i) => (
                <circle key={i} cx={288 + i * 12} cy={166} r="6"
                    fill="none" stroke={ACCENT} strokeWidth="1.4" opacity={1 - i * 0.28} />
            ))}

            {/* Seats — seat 1 is on the clock (accent + pulse), seat 4 folded (faint) */}
            {holdemSeats.map((s, i) => {
                const active = i === 1;
                return (
                    <g key={i}>
                        <circle
                            cx={s.x} cy={s.y} r="15"
                            fill="var(--color-card)"
                            stroke={active ? ACCENT : i === 4 ? STROKE_FAINT : "rgba(235,235,225,0.35)"}
                            strokeWidth="1.4"
                            className={active ? "motif-pulse" : undefined}
                        />
                        {/* hole cards tucked by each live seat */}
                        {i !== 4 && (
                            <>
                                <rect x={s.x - 11} y={s.y + 18} width="10" height="14" rx="2"
                                    fill="var(--color-card)" stroke={STROKE} strokeWidth="1" />
                                <rect x={s.x + 1} y={s.y + 18} width="10" height="14" rx="2"
                                    fill="var(--color-card)" stroke={STROKE} strokeWidth="1" />
                            </>
                        )}
                    </g>
                );
            })}

            {/* Dealer button beside seat 0 */}
            <circle cx={holdemSeats[0].x + 26} cy={holdemSeats[0].y} r="6"
                fill="none" stroke="rgba(235,235,225,0.5)" strokeWidth="1.2" />

            <text x="60" y="385" fill="var(--color-faint)" fontSize="11" fontFamily="var(--font-geist-mono)">
                blinds 5/10 · side pots resolved · chips conserved
            </text>
        </g>
    );
}

const MOTIFS = {
    montecarlo: MonteCarlo,
    agentgraph: AgentGraph,
    floorgrid: FloorGrid,
    flightroutes: FlightRoutes,
    arena: Arena,
    holdem: Holdem,
};

export default function ProjectMotif({ motif, title }) {
    const Motif = MOTIFS[motif] ?? MonteCarlo;
    return (
        <svg
            viewBox="0 0 600 400"
            role="img"
            aria-label={`Abstract system diagram for ${title}`}
            className="h-full w-full"
        >
            <Motif />
        </svg>
    );
}
