export const userData = {
    // Personal Information
    name: "Preetish Ubhrani",
    firstName: "Preetish",
    tagline: "Welcome to my portfolio!",
    role: "Full Stack Web Developer",
    location: "Delhi",
    company: "@Ideo",
    companyRole: "UI Consultant",

    // Hero Description
    description: "I'm a Full Stack Web Developer, from Delhi. Currently a 2nd-year B.Tech student specializing in Computer Science & Artificial Intelligence.",

    // Navigation Links
    navLinks: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Services", href: "#services" },
        { name: "Contact", href: "#contact" },
    ],


    // Call to Action Buttons
    cta: {
        primary: {
            text: "Download Resume",
            href: "#download-cv",
        },
        secondary: {
            text: "See my work",
            href: "#projects",
        },
    },

    // Profile Image 
    profileImage: "/profile.png", 

    // About Section
    about: {
        story: "I'm a passionate Full Stack Developer who loves turning ideas into working products. With a blend of creativity and technical expertise, I craft experiences that are both beautiful and functional.",
        mission: "I love turning ideas into working products.",

        // Tech Stack with icons
        techStack: [
            { name: "React", icon: "⚛️" },
            { name: "Next.js", icon: "▲" },
            { name: "Node.js", icon: "🟢" },
            { name: "TensorFlow", icon: "🧠" },
            { name: "Python", icon: "🐍" },
            { name: "TypeScript", icon: "💙" },
        ],

        // Tools
        tools: [
            { name: "VS Code", icon: "💻" },
            { name: "Figma", icon: "🎨" },
            { name: "GitHub", icon: "🐙" },
            { name: "AWS", icon: "☁️" },
            { name: "Docker", icon: "🐳" },
            { name: "Postman", icon: "📮" },
        ],

        // Categorized Skills with proficiency levels (1-5)
        skills: {
            frontend: [
                { name: "React", level: 5 },
                { name: "Next.js", level: 5 },
                { name: "Tailwind CSS", level: 5 },
                { name: "JavaScript", level: 5 },
                { name: "TypeScript", level: 4 },
                { name: "HTML/CSS", level: 5 },
            ],
            backend: [
                { name: "Node.js", level: 4 },
                { name: "Express.js", level: 4 },
                { name: "Python", level: 4 },
                { name: "REST APIs", level: 5 },
                // { name: "GraphQL", level: 3 },
            ],
            databases: [
                { name: "MongoDB", level: 4 },
                { name: "PostgreSQL", level: 4 },
                { name: "MySQL", level: 3 },
                { name: "Firebase", level: 4 },
            ],
            machineLearning: [
                { name: "TensorFlow", level: 4 },
                { name: "PyTorch", level: 3 },
                { name: "GCP Vertex AI", level: 3 },
                { name: "Scikit-learn", level: 4 },
            ],
            tools: [
                { name: "Git", level: 5 },
                { name: "Docker", level: 3 },
                { name: "Postman", level: 5 },
                { name: "Figma", level: 5 },
                { name: "VS Code", level: 5 },
            ],
            softSkills: [
                { name: "Communication", level: 5 },
                { name: "Leadership", level: 4 },
                { name: "Problem-solving", level: 5 },
                { name: "Team Collaboration", level: 5 },
                { name: "Time Management", level: 4 },
            ],
        },
    },

    // Projects Section
    projects: [
        {
            id: 1,
            title: "DineX",
            description: "A customer facing web portal that allows users to explore restaurants, reserve tables, browse menus and manage payments seamlessly.",
            image: "/images/projects/dinex.png",
            tags: ["Next.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
            category: "Full Stack",
            link: "https://github.com/ubhranipreetish/DineX",
            liveLink: "https://dine-x-mu.vercel.app/",
        },
        {
            id: 2,
            title: "DineX For Business",
            description: "A restaurant management system that streamlines table handling, order processing, and waiter operations in real time.",
            image: "/images/projects/dinex-business.png",
            tags: ["Next.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
            category: "Full Stack",
            link: "https://github.com/ubhranipreetish/DineX",
            liveLink: "https://dine-x-mu.vercel.app/",
        },
        {
            id: 3,
            title: "Travel Canvas",
            description: "A full featured editor with an intuitive interface, Background Customization, Add, edit, resize, and style text with various formatting options, Upload and place images on the canvas and many more customization. Export Options: Save your designs as PNG or PDF with high-quality output.",
            image: "/images/projects/travel-canvas.png",
            tags: ["React", "Tailwind CSS", "Javascript"],
            category: "Frontend",
            link: "https://github.com/ubhranipreetish/Travel-Canvas",
            liveLink: "https://travelcanvas.netlify.app/",
        },
        {
            id: 4,
            title: "Satta Bazaar",
            description: "An online gaming platform offering multiple betting style games with a unified wallet and fair, randomized gameplay logic.",
            image: "/images/projects/satta-bazaar.png",
            tags: ["React", "CSS", "Javascript"],
            category: "Frontend",
            link: "https://github.com/ubhranipreetish/Satta-Bazaar",
            liveLink: "https://sattabazaar.netlify.app/",
        },
        {
            id: 5,
            title: "Heaven Hunt",
            description: "A user friendly real estate platform designed to help users seamlessly search, filter, and explore properties.",
            image: "/images/projects/heaven-hunt.png",
            tags: ["Next.js", "CSS", "Javascript", "Firebase"],
            category: "Frontend",
            link: "https://github.com/ubhranipreetish/Heaven-Hunt",
            liveLink: "https://heaven-hunt-ivory.vercel.app/",
        },
    ],

    // Services Section
    services: {
        title: "Services I Offer",
        subtitle: "Comprehensive solutions to bring your ideas to life with cutting-edge technology and best practices.",
        offerings: [
            {
                id: 1,
                title: "Website Development",
                description: "Full-stack web applications built with modern frameworks like React, Next.js, and Node.js. Responsive, fast, and scalable solutions.",
                icon: "code",
                features: ["Responsive Design", "SEO Optimized", "Fast Performance", "Scalable Architecture"]
            },
            {
                id: 2,
                title: "UI Implementation",
                description: "Pixel-perfect implementation of designs with attention to detail. Transform Figma designs into beautiful, interactive interfaces.",
                icon: "palette",
                features: ["Figma to Code", "Interactive Animations", "Cross-browser Compatible", "Accessibility First"]
            },
            {
                id: 3,
                title: "API Integration",
                description: "Seamless integration of third-party APIs and services. RESTful and GraphQL APIs with proper error handling and authentication.",
                icon: "plug",
                features: ["REST APIs", "GraphQL", "Authentication", "Real-time Data"]
            },
            {
                id: 4,
                title: "Bug Fixing",
                description: "Quick and efficient debugging and bug fixes. Identify root causes and implement robust solutions.",
                icon: "wrench",
                features: ["Root Cause Analysis", "Performance Issues", "Security Patches", "Code Review"]
            },
            {
                id: 5,
                title: "Performance Optimization",
                description: "Optimize your applications for speed and efficiency. Database optimization, code splitting, and caching strategies.",
                icon: "gauge",
                features: ["Speed Optimization", "Database Tuning", "Code Splitting", "Caching Strategies"]
            }
        ]
    },

    // Contact Section
    contact: {
        title: "Let's Work Together",
        subtitle: "Have a project in mind? I'd love to hear about it. Let's chat and bring your ideas to life.",
        email: "ubhranipreetish@gmail.com",
        phone: "+91 9981429495",
        location: "Delhi, India",
        availability: "Available for freelance work",
        socialMedia: [
            {
                name: "GitHub",
                icon: "github",
                url: "https://github.com/ubhranipreetish",
                username: "@yourusername"
            },
            {
                name: "LinkedIn",
                icon: "linkedin",
                url: "https://www.linkedin.com/in/preetish-ubhrani-0a60b9323/",
                username: "@yourusername"
            },
            {
                name: "Twitter",
                icon: "twitter",
                url: "https://twitter.com/yourusername",
                username: "@yourusername"
            },
            {
                name: "Instagram",
                icon: "instagram",
                url: "https://instagram.com/yourusername",
                username: "@yourusername"
            },
        ],
    },
};
