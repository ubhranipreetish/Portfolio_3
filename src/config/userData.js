export const userData = {
    // ─── Identity ───────────────────────────────────────────────
    name: "Preetish Ubhrani",
    firstName: "Preetish",
    role: "AI/ML Engineer",
    secondaryRole: "Full-Stack Developer",
    roles: ["AI/ML Engineer", "Data Analyst", "Full Stack Developer"],
    location: "Delhi, India",
    avatar: "/images/avatar_2.png",
    resume: "/resume.pdf",
    email: "ubhranipreetish@gmail.com",
    phone: "+91 9981429495",

    headline: {
        line1: "I build",
        emphasis: "intelligent systems",
        line2: "end to end.",
    },
    intro:
        "I turn raw data into models, models into agents, and agents into shipped products.",

    nav: [
        { name: "Process", href: "#process" },
        { name: "Work", href: "#work" },
        { name: "Experience", href: "#experience" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ],

    // ─── Scrollytelling pipeline ────────────────────────────────
    pipeline: {
        label: "The Process",
        intro: "How raw data becomes a shipped product",
        steps: [
            {
                k: "01",
                name: "Data",
                line: "Everything starts as noise.",
                body: "Three million flight records. Eighteen seasons of ball-by-ball cricket. Raw CSVs cleaned with contextual imputation, defended with hypothesis tests, trimmed with statistical justification — chaos turned into something a model can trust.",
                tools: "Pandas · SciPy · ETL · Winsorization",
            },
            {
                k: "02",
                name: "Models",
                line: "Then the noise learns a shape.",
                body: "Regression, classification, Monte Carlo. Scikit-learn pipelines tuned with GridSearchCV, OLS models explaining 93.4% of variance, simulation engines running 500 futures in 120 milliseconds.",
                tools: "scikit-learn · Statsmodels · NumPy · Monte Carlo",
            },
            {
                k: "03",
                name: "Agents",
                line: "Then the shape starts to reason.",
                body: "Stateful LangGraph workflows that retrieve regulation, cite their sources, doubt their own answers and reflect until confident. Every citation verified against retrieved context — grounded, not hallucinated.",
                tools: "LangGraph · RAG · FAISS · Llama 3",
            },
            {
                k: "04",
                name: "Products",
                line: "Then it ships.",
                body: "FastAPI backends, Next.js frontends, multi-tenant auth, 60fps render loops. Deployed on Vercel and Render, used by real people, built to survive malformed input and peak-hour load.",
                tools: "Next.js · FastAPI · MongoDB · Vercel",
            },
        ],
    },

    marquee: [
        "Agentic AI",
        "RAG Pipelines",
        "Monte Carlo Simulation",
        "Statistical Modeling",
        "System Design",
        "Full-Stack Engineering",
        "Data Storytelling",
        "WCAG 2.1 AA",
    ],

    // ─── About ──────────────────────────────────────────────────
    about: {
        lede: "Most engineers pick a lane. I picked the whole road.",
        story: [
            "I work across the full lifecycle of an intelligent system — training the model, validating it statistically, wrapping it in a production API, and building the interface people actually use. My projects aren't notebooks that end at a confusion matrix; they're deployed systems with users, uptime and edge cases.",
            "That range is deliberate. A LangGraph agent is only useful if its API survives malformed input. A simulation engine is only convincing if the UI makes probability feel tangible. The interesting problems live in the seams between ML, data and software engineering — so that's where I build.",
        ],
        facts: [
            { label: "Based in", value: "Delhi, India" },
            { label: "Education", value: "B.Tech CS & AI" },
            { label: "Experience", value: "2 internships" },
            { label: "Focus", value: "GenAI · ML · Full-Stack" },
        ],
        stats: [
            { value: "5", suffix: "", label: "flagship systems shipped" },
            { value: "3", suffix: "M+", label: "records processed & modeled" },
            { value: "0.93", suffix: "", label: "best ROC-AUC / R² achieved" },
            { value: "6", suffix: "-seat", label: "realtime poker, server-authoritative" },
        ],
    },

    // ─── Experience ─────────────────────────────────────────────
    experience: [
        {
            company: "EnableUser",
            role: "Full Stack Developer Intern",
            period: "Dec 2025 — Feb 2026",
            location: "Gurugram · Remote",
            current: false,
            summary:
                "Implemented source-level WCAG 2.1 AA accessibility across fintech and trading platforms — fixes in the codebase, not plugin overlays.",
            points: [
                "Wrote semantic HTML, ARIA patterns and focus management across React, WordPress, ASP.NET and Java stacks.",
                "Reproduced and fixed defects with NVDA, JAWS, VoiceOver and keyboard-only navigation.",
                "Built greenfield components meeting WCAG 2.1 AA from the first commit.",
            ],
            stack: ["React", "ARIA APG", "WCAG 2.1 AA", "NVDA / JAWS / VoiceOver", "DevTools a11y tree"],
        },
        {
            company: "Hotel Red Diamond",
            role: "Full Stack Developer",
            period: "Jun 2025 — Aug 2025",
            location: "Part-time",
            current: false,
            summary:
                "Built and deployed a full-stack restaurant POS system used during live service.",
            points: [
                "Built a full-stack restaurant POS improving how orders move between waiters and the kitchen.",
                "Integrated a KOT (Kitchen Order Ticket) workflow so chefs receive and process orders from a centralized system.",
                "Reduced serving time through real-time order updates coordinating floor and kitchen staff.",
                "Cut manual mistakes and order confusion, smoothing operations during peak hours.",
            ],
            stack: ["React", "Node.js", "Express", "MongoDB", "Real-time updates"],
        },
    ],

    // ─── Flagship work ──────────────────────────────────────────
    work: [
        {
            id: "counterplay",
            screenshot: "/images/projects/counterplay-key.png",
            index: "01",
            title: "Counterplay",
            category: "ML · Simulation Systems",
            year: "2026",
            motif: "montecarlo",
            tagline: "A Monte Carlo engine that rewrites cricket history.",
            description:
                "An interactive counterfactual sandbox over 18 seasons of IPL ball-by-ball data. Scrub to any delivery, override the outcome — a wicket becomes a six — and watch 500 parallel simulations recompute the match's win probability in real time.",
            highlights: [
                "Probability engine blending career, venue, matchup and recent-form profiles with Laplace-smoothed priors",
                "500 Monte Carlo paths per request in under 120ms via vectorized NumPy",
                "Momentum and pressure modeling — tanh aggression curves, collapse risk, batsman confidence decay",
            ],
            metrics: ["500 sims / run", "<120ms response", "18 seasons of data"],
            stack: ["Next.js", "React", "FastAPI", "Python", "NumPy", "Pandas"],
            demoNote: "Free-tier backend — first load can take ~30s while it wakes.",
            repo: "https://github.com/ubhranipreetish/What-If",
            live: "https://counterplay-what-if-simulator.vercel.app",
        },
        {
            id: "credit-risk",
            screenshot: "/images/projects/credit-risk-key.png",
            index: "02",
            title: "Credit Risk Analyzer",
            category: "Generative AI · Agentic Systems",
            year: "2026",
            motif: "agentgraph",
            tagline: "An AI agent that lends like a compliance officer.",
            description:
                "A stateful LangGraph agent that fuses scikit-learn risk scoring with RAG over RBI policy documents — producing cited, self-reflected, audit-ready lending decisions instead of black-box scores.",
            highlights: [
                "Conditional graph routing — borderline borrowers trigger a deep-analysis path with wider retrieval",
                "Hallucination containment: every LLM citation is verified against retrieved FAISS chunks before output",
                "Self-reflection loop re-evaluates any decision scoring below 70% multi-signal confidence",
            ],
            metrics: ["0.91 ROC-AUC", "92.7% accuracy", "<5ms vector search"],
            stack: ["Python", "LangGraph", "FastAPI", "FAISS", "scikit-learn", "Llama 3 · Groq"],
            demoNote: "Hosted on Streamlit free tier — may need a \"wake up\" click on arrival.",
            repo: "https://github.com/ubhranipreetish/Credit_Risk_Analysis",
            live: "https://credit-risk-analyzer-456.streamlit.app/",
        },
        {
            id: "all-or-nothing",
            screenshot: "/images/projects/all-or-nothing-key.png",
            index: "03",
            title: "All Or Nothing",
            category: "System Design · Realtime Multiplayer",
            year: "2026",
            motif: "holdem",
            tagline: "A play-money casino built like a bank.",
            description:
                "A five-game casino platform with realtime multiplayer Texas Hold'em, built on a layered Express/TypeScript backend — every rupee server-authoritative, written to an immutable ledger with running balances, and pushed live to clients over WebSockets.",
            highlights: [
                "Framework-free poker state machine — side pots, min-raise reopening, split-pot remainders — fuzz-tested for exact chip conservation",
                "Manual DI composition root wiring Strategy, Factory, Observer and Repository patterns across a strict layered backend",
                "Typed domain-event bus decoupling money mutations from Socket.IO pushes, verified by a 19-check behavior-parity smoke suite",
            ],
            metrics: ["5 games", "6-seat live poker", "19-check parity suite"],
            stack: ["TypeScript", "Express 5", "Next.js", "MongoDB", "Socket.IO", "Mongoose"],
            repo: "https://github.com/ubhranipreetish/All-Or-Nothing",
            live: "https://all-or-nothing-plum.vercel.app",
        },
        {
            id: "dinex",
            screenshot: "/images/projects/dinex-key.png",
            index: "04",
            title: "DineX",
            category: "Full-Stack · Multi-Tenant Platform",
            year: "2026",
            motif: "floorgrid",
            tagline: "One database from doorstep to dessert.",
            description:
                "A B2B/B2C dining platform connecting customer reservations to a live POS floor console. Diners discover and book tables; waitstaff run a color-coded floor grid; owners watch revenue analytics — all on one synchronized data model.",
            highlights: [
                "Multi-tenant JWT middleware scoping every staff action to its parent restaurant",
                "Atomic MongoDB positional updates keep table occupancy and order state in lockstep",
                "31 REST endpoints across customer, owner and floor-staff access tiers",
            ],
            metrics: ["3 user roles", "31 API endpoints", "live floor state"],
            stack: ["Next.js", "Node.js", "Express", "MongoDB", "Mongoose", "Recharts"],
            repo: "https://github.com/ubhranipreetish/DineX",
            live: "https://dine-x-mu.vercel.app/",
        },
        {
            id: "flight-delay",
            screenshot: "/images/projects/flight-delay-key.png",
            index: "05",
            title: "Flight Delay Analysis",
            category: "Data Engineering · Analytics",
            year: "2026",
            motif: "flightroutes",
            tagline: "Three million flights. One verdict: blame the gate.",
            description:
                "An end-to-end ETL, hypothesis-testing and BI pipeline over five years of US domestic flight records — proving that 73.6% of delay minutes are operationally controllable, while weather accounts for just 5.2%.",
            highlights: [
                "OLS regression explaining 93.4% of arrival-delay variance from operational inputs",
                "t-tests and ANOVA validating seasonal spikes and a 13.9-minute carrier performance gap",
                "Winsorization defense isolating black-swan outliers from day-to-day operations",
            ],
            metrics: ["3M records", "R² = 0.934", "73.6% controllable"],
            stack: ["Python", "Pandas", "SciPy", "Statsmodels", "Tableau", "Seaborn"],
            repo: "https://github.com/ubhranipreetish/SectionB_G-18_Flight_Delay_Analysis",
            live: "https://public.tableau.com/app/profile/preetish.ubhrani/viz/Flight_Delay_Analysis_Final_Dashboard/HomePage",
        },
    ],

    // ─── Archive (currently unused — Archive section removed from the page;
    //     data kept so it can be restored later) ──────────────────
    archive: [
        {
            title: "Travel Canvas",
            year: "2025",
            category: "Frontend · Design Tool",
            description: "Full-featured canvas editor — text, images, backgrounds, PNG/PDF export.",
            stack: ["React", "JavaScript", "Tailwind CSS"],
            repo: "https://github.com/ubhranipreetish/Travel-Canvas",
            live: "https://travelcanvas.netlify.app/",
        },
        {
            title: "Heaven Hunt",
            year: "2025",
            category: "Frontend · Real Estate",
            description: "Property discovery platform with search, filters and Firebase-backed listings.",
            stack: ["Next.js", "Firebase", "CSS"],
            repo: "https://github.com/ubhranipreetish/Heaven-Hunt",
            live: "https://heaven-hunt-ivory.vercel.app/",
        },
        {
            title: "Satta Bazaar",
            year: "2025",
            category: "Frontend · Gaming",
            description: "Multi-game betting platform with a unified wallet and randomized game logic.",
            stack: ["React", "JavaScript", "CSS"],
            repo: "https://github.com/ubhranipreetish/Satta-Bazaar",
            live: "https://sattabazaar.netlify.app/",
        },
        {
            title: "MS Excel Clone",
            year: "2025",
            category: "Frontend · Systems",
            description: "Spreadsheet engine in vanilla JavaScript — formulas, cell dependencies, formatting.",
            stack: ["JavaScript", "HTML", "CSS"],
            repo: "https://github.com/ubhranipreetish/MS-Excel-Clone",
            live: "https://ms-excel-clone-eta.vercel.app",
        },
        {
            title: "Netflix EDA",
            year: "2026",
            category: "Data · Visualization",
            description: "Exploratory analysis of the Netflix catalog, published as a Tableau dashboard.",
            stack: ["Python", "Pandas", "Tableau"],
            repo: "https://github.com/ubhranipreetish/Netflix-EDA",
            live: "https://public.tableau.com/app/profile/preetish.ubhrani/viz/NetflixProject-TableauDashboard_17779080486510/Netflix",
        },
        {
            title: "FIFA World Cup EDA",
            year: "2026",
            category: "Data · Visualization",
            description: "Statistical breakdown of World Cup results 1930–2014 with interactive dashboards.",
            stack: ["Python", "Pandas", "Tableau"],
            repo: "https://github.com/ubhranipreetish/Fifa-World-Cup-EDA",
            live: "https://public.tableau.com/views/FIFAWorldCupResults1930-2014_17779078028910/Dashboard",
        },
        {
            title: "Movie App",
            year: "2025",
            category: "Frontend · API Integration",
            description: "Movie browser with live API data and persistent favourites.",
            stack: ["React", "JavaScript", "REST APIs"],
            repo: "https://github.com/ubhranipreetish/Movie-App",
            live: "https://movie-app-delta-virid-46.vercel.app",
        },
        {
            title: "Iron Rampage",
            year: "2026",
            category: "Frontend · Game",
            description: "Browser action game built in TypeScript, deployed on Vercel.",
            stack: ["TypeScript", "Next.js", "Canvas"],
            repo: "https://github.com/ubhranipreetish/Iron-Rampage",
            live: "https://iron-rampage.vercel.app",
        },
        {
            title: "Zombie Survival Shooter",
            year: "2026",
            category: "Game · Performance",
            description: "Wave-based roguelike on a hand-rolled Canvas engine — 1,000+ entities at a locked 60fps, zero game libraries.",
            stack: ["TypeScript", "Next.js", "HTML5 Canvas"],
            repo: "https://github.com/ubhranipreetish/Zombie-Survival-Shooter",
            live: "https://zombie-survival-shooter.vercel.app",
        },
        {
            title: "ElectroDeals",
            year: "2026",
            category: "Frontend · E-commerce",
            description: "Electronics deals storefront built in JavaScript.",
            stack: ["JavaScript", "React"],
            repo: "https://github.com/ubhranipreetish/ElectroDeals",
            live: null,
        },
        {
            title: "TaxSafar",
            year: "2026",
            category: "Frontend · Client Work",
            description: "Tax services web platform built as a client assignment.",
            stack: ["JavaScript", "Next.js"],
            repo: "https://github.com/ubhranipreetish/TaxSafar-Assignment",
            live: "https://tax-safar-assignment-azure.vercel.app",
        },
    ],

    // ─── Capabilities — rendered as the 4-channel Signal Analyzer ───
    capabilities: [
        {
            index: "A",
            short: "Agents",
            title: "Generative AI & Agents",
            wave: "agents",
            trace: "REASONING TRACE",
            description:
                "Stateful agent workflows with conditional routing and self-reflection loops. RAG pipelines with grounding checks so the model can cite, not invent.",
            tools: ["LangGraph", "RAG", "FAISS", "Sentence-Transformers", "Llama 3 / Groq", "Prompt Engineering", "Pydantic"],
            proof: "Credit Risk Analyzer",
        },
        {
            index: "B",
            short: "ML & Data",
            title: "Machine Learning & Data Science",
            wave: "ml",
            trace: "NOISE → SIGNAL",
            description:
                "From raw CSVs to defensible conclusions — preprocessing pipelines, hypothesis testing, regression modeling, Monte Carlo methods and honest evaluation.",
            tools: ["Python", "scikit-learn", "NumPy", "Pandas", "SciPy", "Statsmodels", "Tableau", "Matplotlib"],
            proof: "Counterplay · Flight Delay Analysis",
        },
        {
            index: "C",
            short: "Full-Stack",
            title: "Full-Stack Engineering",
            wave: "stack",
            trace: "CLOCK / DATA BUS",
            description:
                "Production web apps with real auth, real databases and real deployments. Multi-tenant APIs, role-based access and interfaces that hold up under load.",
            tools: ["Next.js", "React", "TypeScript", "Node.js", "Express", "FastAPI", "MongoDB", "Tailwind CSS"],
            proof: "DineX · All Or Nothing",
        },
        {
            index: "D",
            short: "Systems",
            title: "Systems & Accessibility",
            wave: "systems",
            trace: "UPTIME PULSE",
            description:
                "Layered architectures, design patterns, event-driven decoupling and performance budgets — plus WCAG 2.1 AA engineering practiced professionally.",
            tools: ["System Design", "OOD / SOLID", "State Machines", "WCAG 2.1 AA", "ARIA APG", "Git", "Vercel · Render"],
            proof: "All Or Nothing · EnableUser",
        },
    ],

    // ─── Contact ────────────────────────────────────────────────
    contact: {
        heading: "Let's build something that thinks.",
        sub: "Open to AI/ML and full-stack roles, internships and freelance work. If you've read this far, we should talk.",
        socials: [
            { name: "GitHub", url: "https://github.com/ubhranipreetish", handle: "ubhranipreetish" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/preetish-ubhrani/", handle: "preetish-ubhrani" },
        ],
    },
};
