import { useEffect, useRef, useState } from "react";
import Chatbot from "./Chatbot";
import CustomCursor from "./CustomCursor";
import SiteEffects from "./SiteEffects";
import Typewriter from "./Typewriter";
import projects from "./projects";

const NAV = ["about", "stack", "work", "jobs", "contact"];

const FEATURED = [
    {
        id: 113,
        title: "AI Book",
        kicker: "Multi-tenant RAG knowledge base",
        copy: "Teams create shared libraries, upload PDFs, websites, and notes, then ask grounded questions with streaming answers and source citations.",
        bullets: [
            "Role-based access for Owner, Admin, Manager, and Member, with email invitations and ownership transfer",
            "RAG pipeline with document chunking, NVIDIA 4096-dim embeddings, and MongoDB Atlas Vector Search",
            "Citation-aware streaming responses, with an in-memory fallback when vector search is unavailable",
            "Usage analytics, rate limiting, structured error codes, PDF parsing, and a real-time workspace"
        ],
        tags: ["Next.js", "TypeScript", "MongoDB Atlas", "LangChain", "NVIDIA Embeddings"],
        github: "https://github.com/Meghsham15/ai-book"
    },
    {
        id: 114,
        title: "RAG Portfolio Chatbot",
        kicker: "Live on this site",
        copy: "A production RAG chatbot that answers questions about professional experience and projects.",
        bullets: [
            "Document chunking, embeddings, and a memory vector store",
            "Dual-LLM fallback between Gemini and Groq",
            "Conversation history, plus handling for API quotas and expired tokens"
        ],
        tags: ["Node.js", "Express", "LangChain", "Gemini", "Groq", "Vector Store"],
        github: "https://github.com/Meghsham15/rag-bot",
        liveAsk: true
    },
    {
        id: 109,
        title: "Real-time chat",
        kicker: "WebSockets",
        copy: "A multi-user chat platform with instant messaging, emoji support, and media sharing.",
        bullets: [
            "Rooms stay in sync over Socket.IO",
            "Emoji and media sharing on a Node and Express stack"
        ],
        tags: ["Node.js", "Socket.IO", "Express", "EJS"],
        github: "https://github.com/Meghsham15/chat-app/tree/main"
    },
    {
        id: 115,
        title: "StartBiz",
        kicker: "Business services site",
        copy: "Registration and services pages with dynamic routing and custom SEO build scripts.",
        bullets: [
            "QR generation and image work aimed at conversion",
            "Deployed for production traffic",
            "Cloudflare in front of the static build"
        ],
        tags: ["React 19", "Tailwind", "SEO", "Cloudflare"],
        github: "https://github.com/Meghsham15/startbiz-code"
    }
];

const MORE_IDS = [101, 102, 107];

const STACK = {
    languages: ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3"],
    frontend: ["React.js", "Next.js", "Tailwind CSS", "Material UI"],
    backend: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "OAuth"],
    "ai / rag": ["LangChain", "RAG", "Vector Embeddings", "Document Chunking", "Atlas Vector Search", "Gemini", "Groq", "NVIDIA"],
    data: ["MongoDB", "Mongoose", "SQL"],
    tools: ["Git", "GitHub", "Vercel", "Cloudflare", "Render", "AWS", "Azure"]
};

const STACK_FILTERS = ["all", "languages", "frontend", "backend", "ai / rag", "data", "tools"];

const ALSO = ["Meta Business APIs", "NextAuth", "Google OAuth", "Webhooks", "SEO", "Agile"];

const JOBS = [
    {
        role: "Full Stack Developer",
        place: "Suscin Innovation Labs, Pune",
        when: "July 2024 – Present",
        copy: "Led a multi-feature business communication platform from architecture through production, on React and Node.js/Express.",
        bullets: [
            "Designed Meta Business API integrations for messaging, template management, and real-time flows, including webhooks and status tracking",
            "Built document processing and chunking pipelines so AI features can retrieve context and answer from it",
            "Shipped user management, analytics dashboards, notification systems, and automated workflows",
            "Tested and fixed frontend and backend issues, and worked with other teams on API design, state, and deployment"
        ],
        tags: ["React", "Node.js", "Express", "Meta Business API", "Webhooks", "RAG"],
        skills: [
            "Next.js",
            "React.js",
            "JavaScript",
            "DOM Manipulation",
            "HTML5",
            "CSS3",
            "Node.js",
            "Express.js",
            "REST APIs",
            "MongoDB",
            "Mongoose",
            "Meta Business APIs",
            "Webhooks",
            "OAuth",
            "Document Chunking",
            "RAG",
            "Git"
        ]
    },
    {
        role: "JavaScript Developer Intern",
        place: "Shunyadotek Company, Pune",
        when: "November 2022 – April 2023",
        copy: "Built and maintained web applications in core JavaScript and modern frameworks with senior developers.",
        bullets: [
            "Worked on client projects across debugging, testing, and code optimization",
            "Followed features through the full development lifecycle"
        ],
        tags: ["JavaScript", "Debugging", "Testing", "Optimization"]
    }
];

const INTERESTS = ["RAG and LangChain", "MERN and Next.js", "Real-time apps", "Web3 and ICP"];

const LANGUAGES = ["English · Professional", "Hindi · Fluent", "Marathi · Native"];

function projectById(id) {
    return projects.find(function (item) {
        return item.id === id;
    });
}

function openResume() {
    const el = document.querySelector("#resumeCon");
    if (el) {
        el.classList.remove("display");
    }
}

function Reveal({ className, children, delay }) {
    const ref = useRef(null);

    useEffect(function () {
        const el = ref.current;
        if (!el) {
            return undefined;
        }
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            el.classList.add("is-in");
            return undefined;
        }
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    el.classList.add("is-in");
                    observer.disconnect();
                }
            });
        }, { threshold: 0.18 });
        observer.observe(el);
        return function () {
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={ref} className={"reveal " + (className || "")} style={delay ? { transitionDelay: delay + "ms" } : undefined}>
            {children}
        </div>
    );
}

function SectionLabel({ children }) {
    return (
        <div className="sec-label">
            <p>/{children}</p>
            <span />
        </div>
    );
}

function IdentityCard({ onConnect }) {
    const ref = useRef(null);

    function move(event) {
        const el = ref.current;
        if (!el || window.matchMedia("(hover: none)").matches) {
            return;
        }
        const box = el.getBoundingClientRect();
        const px = (event.clientX - box.left) / box.width;
        const py = (event.clientY - box.top) / box.height;
        el.style.setProperty("--ry", ((px - 0.5) * 16).toFixed(2) + "deg");
        el.style.setProperty("--rx", ((0.5 - py) * 14).toFixed(2) + "deg");
    }

    function leave() {
        const el = ref.current;
        if (!el) {
            return;
        }
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--rx", "0deg");
    }

    return (
        <div className="id-tilt" onMouseMove={move} onMouseLeave={leave}>
            <article className="id-card" ref={ref}>
                <div className="id-top">
                    <div className="id-mark" aria-hidden="true">MJ</div>
                    <div>
                        <p className="id-handle">@meghsham15</p>
                        <p>Available for hire</p>
                        <p>Pune, Maharashtra</p>
                    </div>
                </div>
                <h3>Meghsham Jade</h3>
                <p className="id-role">Full Stack AI Developer</p>
                <p className="id-edu">B.E. Electronics and Telecommunication · JSPM BSIOTR, Wagholi · 2022–2026</p>
                <button type="button" onClick={onConnect}>Let&apos;s Connect</button>
            </article>
        </div>
    );
}

function ProjectCard({ item, onAsk }) {
    const [open, setOpen] = useState(false);
    const live = projectById(item.id);
    const shown = open ? item.tags : item.tags.slice(0, 4);
    const extra = item.tags.length - 4;
    const stillClass = "case-still" + (live && live.img ? "" : " is-empty");
    const stillInner = (
        <>
            {live && live.img ? <img src={live.img} alt="" /> : <span>{item.title}</span>}
            <i className="case-shade" />
            <i className="case-shine" />
            <div className="case-caption">
                <h3>{item.title}</h3>
                <p>{item.kicker}</p>
            </div>
        </>
    );

    return (
        <article className="case">
            {item.liveAsk ? (
                <button type="button" className={stillClass} onClick={onAsk}>
                    {stillInner}
                </button>
            ) : (
                <a className={stillClass} href={live && live.link ? live.link : item.github} target="_blank" rel="noopener noreferrer">
                    {stillInner}
                </a>
            )}
            <div className="case-body">
                <p>{item.copy}</p>
                <ul>
                    {item.bullets.map(function (line) {
                        return <li key={line}>{line}</li>;
                    })}
                </ul>
                <div className="case-tags">
                    {shown.map(function (tag) {
                        return <span key={tag}>{tag}</span>;
                    })}
                    {extra > 0 ? (
                        <button type="button" onClick={function () { setOpen(function (value) { return !value; }); }}>
                            {open ? "− less" : "+" + extra}
                        </button>
                    ) : null}
                </div>
                <p className="case-links">
                    <a href={item.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                    {item.liveAsk ? (
                        <button type="button" className="case-live" onClick={onAsk}>Live</button>
                    ) : live && live.link ? (
                        <a href={live.link} target="_blank" rel="noopener noreferrer">Live</a>
                    ) : null}
                </p>
            </div>
        </article>
    );
}

function Container() {
    const [chatOpen, setChatOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState("about");
    const [navHidden, setNavHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [filter, setFilter] = useState("all");

    useEffect(function () {
        document.documentElement.classList.add("site");
        document.body.classList.add("site-body");
        return function () {
            document.documentElement.classList.remove("site");
            document.body.classList.remove("site-body");
        };
    }, []);

    useEffect(function () {
        document.body.classList.toggle("chat-open", chatOpen);
        document.body.classList.toggle("menu-open", menuOpen);
        document.body.style.overflow = chatOpen || menuOpen ? "hidden" : "";
        return function () {
            document.body.classList.remove("chat-open");
            document.body.classList.remove("menu-open");
            document.body.style.overflow = "";
        };
    }, [chatOpen, menuOpen]);

    useEffect(function () {
        let last = window.scrollY;
        function onScroll() {
            const y = window.scrollY;
            setScrolled(y > 8);
            setNavHidden(y > last && y > 90 && !menuOpen);
            last = y;
            const line = y + window.innerHeight * 0.28;
            let current = NAV[0];
            NAV.forEach(function (id) {
                const node = document.getElementById(id);
                if (node && node.offsetTop <= line) {
                    current = id;
                }
            });
            setActive(current);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return function () {
            window.removeEventListener("scroll", onScroll);
        };
    }, [menuOpen]);

    const moreWork = MORE_IDS.map(projectById).filter(Boolean);
    const stackGroups = filter === "all" ? Object.keys(STACK) : [filter];

    function go(id) {
        setMenuOpen(false);
        const node = document.getElementById(id);
        if (node) {
            node.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    return (
        <>
            <CustomCursor />
            <SiteEffects />
            <div className="stage-bg" aria-hidden="true">
                <div className="stage-grid" />
                <div className="stage-orb stage-orb-a" />
                <div className="stage-orb stage-orb-b" />
                <div className="stage-glow" />
            </div>
            <a className="skip" href="#work">Skip to work</a>

            <header className={"nav" + (scrolled ? " is-scrolled" : "") + (navHidden && !menuOpen ? " is-hidden" : "")}>
                <a className="nav-mark" href="#top" onClick={function (event) { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                    <pre>&lt;/meghsham&gt;</pre>
                </a>
                <nav className="nav-links" aria-label="Page">
                    {NAV.map(function (id) {
                        return (
                            <a key={id} href={"#" + id} className={active === id ? "is-on" : ""} onClick={function (event) { event.preventDefault(); go(id); }}>
                                /{id}
                            </a>
                        );
                    })}
                    <button type="button" onClick={openResume}>/resume</button>
                    <button type="button" className="nav-ask" onClick={function () { setChatOpen(true); }}>Ask</button>
                </nav>
                <button type="button" className="nav-burger" aria-label={menuOpen ? "Close menu" : "Toggle menu"} onClick={function () { setMenuOpen(function (value) { return !value; }); }}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        {menuOpen ? (
                            <path d="M6 6l12 12M18 6L6 18" />
                        ) : (
                            <path d="M4 7h16M4 12h16M4 17h16" />
                        )}
                    </svg>
                </button>
            </header>

            <div className={"nav-sheet" + (menuOpen ? " is-open" : "")} aria-hidden={menuOpen ? undefined : true}>
                <div className="nav-sheet-links">
                    {NAV.map(function (id) {
                        return (
                            <a key={id} href={"#" + id} className={active === id ? "is-on" : ""} onClick={function (event) { event.preventDefault(); go(id); }}>
                                /{id}
                            </a>
                        );
                    })}
                    <button type="button" onClick={function () { setMenuOpen(false); openResume(); }}>/resume</button>
                    <button type="button" onClick={function () { setMenuOpen(false); setChatOpen(true); }}>/ask</button>
                    <button type="button" className="nav-close" onClick={function () { setMenuOpen(false); }}>Close Menu</button>
                </div>
            </div>

            <main id="top">
                <section className="hero">
                    <p className="hero-const">
                        <span>const</span> developer = <em>&quot;Meghsham Jade&quot;</em>;
                    </p>
                    <h1>Full Stack AI Developer</h1>
                    <h2 className="hero-type"><Typewriter /></h2>
                    <p className="hero-copy">
                        Full-Stack Developer focused on AI and RAG systems, with Next.js, Node.js, and MongoDB. 2+ years shipping scalable web applications from architecture to deployment.
                    </p>
                    <div className="hero-actions">
                        <a className="btn-fill" href="#work" onClick={function (event) { event.preventDefault(); go("work"); }}>
                            View Projects <span>→</span>
                        </a>
                        <a className="btn-line" href="#contact" onClick={function (event) { event.preventDefault(); go("contact"); }}>Get in Touch</a>
                    </div>
                    <div className="hero-braces" aria-hidden="true">{"{ }"}</div>
                    <div className="hero-bars" aria-hidden="true"><i /><i /><i /></div>
                    <div className="hero-dots" aria-hidden="true"><i /><i /><i /><i /></div>
                    <aside className="mantra">
                        <span aria-hidden="true">&ldquo;</span>
                        <p>From architecture to deployment, ready for production.</p>
                        <div><i />Focus</div>
                    </aside>
                    <p className="hero-roles" aria-hidden="true">
                        <span>{"// full-stack"}</span>
                        <span>{"// AI"}</span>
                        <span>{"// web3"}</span>
                    </p>
                </section>

                <section className="block" id="about">
                    <SectionLabel>about</SectionLabel>
                    <div className="about-grid">
                        <Reveal>
                            <IdentityCard onConnect={function () { go("contact"); }} />
                        </Reveal>
                        <div className="about-copy">
                            <Reveal>
                                <h2>A developer who <span>ships production work</span></h2>
                            </Reveal>
                            <Reveal delay={80}>
                                <div className="about-lead">
                                    <p>
                                        Full-Stack Developer with 2+ years building scalable web applications and <strong>AI-powered solutions</strong>. Proficient in the MERN stack, Next.js, React, and Node.js, with hands-on work in RAG, LangChain, vector embeddings, multi-tenant SaaS, and third-party APIs including Meta Business. I take products from architecture to deployment: features, performance, testing, and bug fixes, through to production.
                                    </p>
                                </div>
                            </Reveal>
                            <Reveal delay={140}>
                                <blockquote>
                                    Production-ready applications with clean architecture, real-time capabilities, and AI integration.
                                </blockquote>
                            </Reveal>
                            <Reveal delay={180}>
                                <div className="interests">
                                    <h3>Interests</h3>
                                    <ul>
                                        {INTERESTS.map(function (item) {
                                            return <li key={item}>{item}</li>;
                                        })}
                                    </ul>
                                    <h3>Languages</h3>
                                    <ul>
                                        {LANGUAGES.map(function (item) {
                                            return <li key={item}>{item}</li>;
                                        })}
                                    </ul>
                                </div>
                            </Reveal>
                            <Reveal delay={220}>
                                <button type="button" className="btn-line btn-wide" onClick={openResume}>
                                    View Full Resume <span>→</span>
                                </button>
                            </Reveal>
                        </div>
                    </div>
                </section>

                <section className="block" id="stack">
                    <SectionLabel>stack</SectionLabel>
                    <div className="stack-head">
                        <Reveal>
                            <div>
                                <h2>My Tech Stack</h2>
                                <p>JavaScript, Python, React, Next.js, and Node.js, plus the AI and delivery tools behind production work.</p>
                            </div>
                        </Reveal>
                        <Reveal delay={80}>
                            <aside className="stack-note">
                                <p>&quot;Clean architecture. Real-time when it matters. AI when the product needs it.&quot;</p>
                                <span>~ how I build</span>
                            </aside>
                        </Reveal>
                    </div>
                    <div className="stack-filters" role="tablist" aria-label="Stack filter">
                        {STACK_FILTERS.map(function (name) {
                            return (
                                <button key={name} type="button" role="tab" aria-selected={filter === name} className={filter === name ? "is-on" : ""} onClick={function () { setFilter(name); }}>
                                    {name}
                                </button>
                            );
                        })}
                    </div>
                    <div className="stack-groups" key={filter}>
                        {stackGroups.map(function (group) {
                            return (
                                <div key={group}>
                                    <h3>{group}</h3>
                                    <ul>
                                        {STACK[group].map(function (name, index) {
                                            return <li key={name} style={{ animationDelay: (index * 45) + "ms" }}>{name}</li>;
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                    <p className="stack-also">
                        <span>Also comfortable with</span>
                        {ALSO.map(function (name) {
                            return <em key={name}>{name}</em>;
                        })}
                    </p>
                </section>

                <section className="block" id="work">
                    <SectionLabel>work</SectionLabel>
                    <Reveal>
                        <div className="block-intro">
                            <h2>Things I&apos;ve Built</h2>
                            <p>Real-time applications, RAG systems, and Web3, taken from architecture to deployment.</p>
                        </div>
                    </Reveal>
                    <div className="case-grid">
                        {FEATURED.map(function (item) {
                            return (
                                <ProjectCard
                                    key={item.id}
                                    item={item}
                                    onAsk={function () { setChatOpen(true); }}
                                />
                            );
                        })}
                    </div>
                    <ul className="also">
                        {moreWork.map(function (item) {
                            return (
                                <li key={item.id}>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                                        <strong>{item.name}</strong>
                                        <span>{item.des}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <p className="more-link">
                        <a href="https://github.com/Meghsham15" target="_blank" rel="noopener noreferrer">View all projects on GitHub</a>
                    </p>
                </section>

                <section className="block" id="jobs">
                    <SectionLabel>jobs</SectionLabel>
                    <Reveal>
                        <div className="block-intro">
                            <h2>Where I&apos;ve Worked</h2>
                            <p>End-to-end delivery: features, performance, testing, bug fixes, and deployment.</p>
                        </div>
                    </Reveal>
                    <ul className="case-grid">
                        {JOBS.map(function (job) {
                            return (
                                <li key={job.role}>
                                    <JobCard job={job} />
                                </li>
                            );
                        })}
                    </ul>
                </section>

                <section className="block" id="contact">
                    <SectionLabel>contact</SectionLabel>
                    <Reveal>
                        <div className="block-intro">
                            <h2>Let&apos;s work together</h2>
                            <p className="contact-lead">Pune, Maharashtra. Open to full-stack and AI roles. Email, call, or ask the bot on this page. I usually reply within a day.</p>
                        </div>
                    </Reveal>
                    <div className="contact-rows">
                        <a href="https://github.com/Meghsham15" target="_blank" rel="noopener noreferrer">
                            <strong>GitHub</strong>
                            <span>github.com/Meghsham15</span>
                        </a>
                        <a href="https://www.linkedin.com/in/meghsham-jade-2a3406218/" target="_blank" rel="noopener noreferrer">
                            <strong>LinkedIn</strong>
                            <span>linkedin.com/in/meghsham-jade-2a3406218</span>
                        </a>
                        <a href="mailto:meghshamjade.contact@gmail.com">
                            <strong>Email</strong>
                            <span>meghshamjade.contact@gmail.com</span>
                        </a>
                        <a href="tel:+919325366493">
                            <strong>Phone</strong>
                            <span>+91 9325366493</span>
                        </a>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn-line" onClick={openResume}>Resume</button>
                        <button type="button" className="btn-line" onClick={function () { setChatOpen(true); }}>Ask</button>
                    </div>
                </section>
            </main>

            <footer className="foot">
                <div className="foot-rule" />
                <p>Full Stack AI Developer. Scalable web apps, RAG, and production delivery.</p>
                <p className="foot-made">Grow everyday with Meghsham</p>
                <p className="foot-links">
                    <a href="https://github.com/Meghsham15" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/meghsham-jade-2a3406218/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <button type="button" onClick={function () { window.scrollTo({ top: 0, behavior: "smooth" }); }}>Scroll to top</button>
                </p>
                <p className="foot-copy">© {new Date().getFullYear()} · All rights reserved</p>
            </footer>

            {chatOpen ? (
                <div
                    className="site-chat"
                    onClick={function (event) {
                        if (event.target === event.currentTarget) {
                            setChatOpen(false);
                        }
                    }}
                >
                    <Chatbot onClose={function () { setChatOpen(false); }} />
                </div>
            ) : null}
        </>
    );
}

function JobCard({ job }) {
    const [open, setOpen] = useState(false);
    const shown = open ? job.tags : job.tags.slice(0, 4);
    const extra = job.tags.length - 4;

    return (
        <article className="case">
            <div className="case-still is-empty">
                <span>{job.place.split(",")[0]}</span>
                <i className="case-shade" />
                <i className="case-shine" />
                <div className="case-caption">
                    <h3>{job.role}</h3>
                    <p>{job.when}</p>
                </div>
            </div>
            <div className="case-body">
                <p className="job-place">{job.place}</p>
                <p>{job.copy}</p>
                <ul>
                    {job.bullets.map(function (line) {
                        return <li key={line}>{line}</li>;
                    })}
                </ul>
                {job.skills ? (
                    <div className="job-skills">
                        {job.skills.map(function (skill) {
                            return <span key={skill}>{skill}</span>;
                        })}
                    </div>
                ) : (
                    <div className="case-tags">
                        {shown.map(function (tag) {
                            return <span key={tag}>{tag}</span>;
                        })}
                        {extra > 0 ? (
                            <button type="button" onClick={function () { setOpen(function (value) { return !value; }); }}>
                                {open ? "− less" : "+" + extra}
                            </button>
                        ) : null}
                    </div>
                )}
            </div>
        </article>
    );
}

export default Container;
