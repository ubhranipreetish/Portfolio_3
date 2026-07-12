import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Preetish Ubhrani — AI/ML Engineer",
  description:
    "AI/ML engineer and full-stack developer building agentic AI systems, simulation engines, statistical models and the production apps that ship them. Based in Delhi, India.",
  keywords: [
    "AI Engineer", "ML Engineer", "Generative AI", "LangGraph", "RAG",
    "Full-Stack Developer", "Next.js", "Python", "Preetish Ubhrani",
  ],
  openGraph: {
    title: "Preetish Ubhrani — AI/ML Engineer",
    description:
      "Agentic AI pipelines, Monte Carlo simulation engines, statistical models — and the full-stack products that ship them.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preetish Ubhrani — AI/ML Engineer",
    description:
      "Agentic AI pipelines, Monte Carlo simulation engines, statistical models — and the full-stack products that ship them.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} grain antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
