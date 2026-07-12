import { ImageResponse } from "next/og";

/* ── OG / social share image — generated from code so it always matches
   the Signal design tokens. Near-black canvas, bone display type, the
   "four paths" fan as the single brand mark, mono wordmark chrome.     */

export const alt =
    "Preetish Ubhrani — AI/ML Engineer & Full-Stack Developer. I build intelligent systems end to end.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fetch a TTF from Google Fonts, subset to just the glyphs we render.
async function loadGoogleFont(family, weight, text, italic = false) {
    const fam = italic
        ? `${family.replace(/ /g, "+")}:ital,wght@1,${weight}`
        : `${family.replace(/ /g, "+")}:wght@${weight}`;
    const url = `https://fonts.googleapis.com/css2?family=${fam}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const resource = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!resource) throw new Error(`Failed to load font: ${family}`);
    return await (await fetch(resource[1])).arrayBuffer();
}

const ACCENT = "#c9f24b";
const BONE = "#ebebe3";
const FAINT = "#5b5b54";

export default async function OGImage() {
    const displayText = "PREETISH UBHRANI I build end to end.";
    const serifText = "intelligent systems";
    const monoText = "preetish.ubhrani AI/ML ENGINEER · FULL-STACK DEVELOPER PORTFOLIO / 2026 ·";

    // If any font fetch fails, fall back to ImageResponse's built-in font
    // rather than 500ing the share image.
    let fonts = [];
    try {
        const [geist, geistMono, serif] = await Promise.all([
            loadGoogleFont("Geist", 600, displayText),
            loadGoogleFont("Geist Mono", 400, monoText),
            loadGoogleFont("Instrument Serif", 400, serifText, true),
        ]);
        fonts = [
            { name: "Geist", data: geist, weight: 600, style: "normal" },
            { name: "Geist Mono", data: geistMono, weight: 400, style: "normal" },
            { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
        ];
    } catch {
        fonts = [];
    }

    // Four paths fanning out from one origin — the site's core line.
    const fanPath = (y) => `M -40 315 C 260 315, 330 ${y}, 560 ${y}`;
    const fanYs = [96, 242, 388, 534];

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    backgroundColor: "#0a0a0c",
                    backgroundImage:
                        "radial-gradient(rgba(235,235,225,0.07) 1.5px, transparent 1.5px)",
                    backgroundSize: "34px 34px",
                    padding: "56px 72px",
                    fontFamily: "Geist",
                    color: BONE,
                }}
            >
                {/* four-paths fan, anchored right */}
                <svg
                    width="640"
                    height="630"
                    viewBox="0 0 640 630"
                    style={{ position: "absolute", right: 0, top: 0 }}
                >
                    {fanYs.map((y, i) => (
                        <path
                            key={y}
                            d={fanPath(y)}
                            fill="none"
                            stroke={i === 0 ? ACCENT : "rgba(235,235,225,0.16)"}
                            strokeWidth={i === 0 ? 2.5 : 1.5}
                        />
                    ))}
                    {fanYs.map((y, i) => (
                        <circle
                            key={`d-${y}`}
                            cx="560"
                            cy={y}
                            r="7"
                            fill={i === 0 ? ACCENT : "#0a0a0c"}
                            stroke={i === 0 ? ACCENT : "rgba(235,235,225,0.3)"}
                            strokeWidth="1.5"
                        />
                    ))}
                    <circle cx="-40" cy="315" r="90" fill="rgba(201,242,75,0.08)" />
                </svg>

                {/* top chrome */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "Geist Mono",
                        fontSize: 22,
                        color: FAINT,
                    }}
                >
                    <div style={{ display: "flex" }}>
                        <span style={{ color: BONE }}>preetish</span>
                        <span style={{ color: ACCENT }}>.</span>
                        <span style={{ color: BONE }}>ubhrani</span>
                    </div>
                    <span>PORTFOLIO / 2026</span>
                </div>

                {/* name + value line */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            fontSize: 118,
                            lineHeight: 1.02,
                            letterSpacing: "-0.03em",
                            display: "flex",
                        }}
                    >
                        PREETISH
                    </div>
                    <div
                        style={{
                            fontSize: 118,
                            lineHeight: 1.02,
                            letterSpacing: "-0.03em",
                            color: "rgba(235,235,225,0.38)",
                            display: "flex",
                        }}
                    >
                        UBHRANI
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "baseline",
                            marginTop: 34,
                            fontSize: 36,
                            color: "#8e8e85",
                        }}
                    >
                        <span>I build</span>
                        <span
                            style={{
                                fontFamily: "Instrument Serif",
                                fontStyle: "italic",
                                color: ACCENT,
                                marginLeft: 13,
                                marginRight: 13,
                            }}
                        >
                            intelligent systems
                        </span>
                        <span>end to end.</span>
                    </div>
                </div>

                {/* bottom chrome */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "Geist Mono",
                        fontSize: 21,
                        color: FAINT,
                    }}
                >
                    <div
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: 12,
                            backgroundColor: ACCENT,
                            marginRight: 16,
                            display: "flex",
                        }}
                    />
                    <span>AI/ML ENGINEER · FULL-STACK DEVELOPER</span>
                </div>
            </div>
        ),
        fonts.length ? { ...size, fonts } : { ...size }
    );
}
