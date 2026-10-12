import { useEffect, useState } from "react";
import Chatbot from "./Chatbot";
import CustomCursor from "./CustomCursor";
import GlassPanel from "./GlassPanel";
import SiteEffects from "./SiteEffects";
import Typewriter from "./Typewriter";
import projects from "./projects";
import skills from "./skills";
import devSkills from "./devSkills";

const TECH_PILLS = ["Node.js", "Next.js / React", "Python", "MongoDB / SQL", "ICP / Web3"];

const FEATURED = [
    {
        id: 109,
        title: "Real-Time Chat Application",
        copy: "Built a comprehensive chat application implementing real-time multi-user communication with instant messaging, emoji drawer, and media sharing capabilities.",
        tags: ["Node.js", "Socket.IO", "EJS"],
        accent: "cyan",
        icon: "chat"
    },
    {
        id: 101,
        title: "Web3 Portfolio Website",
        copy: "Created a personal portfolio showcasing decentralized web technologies. Developed using cutting-edge Web3 architecture and deployed on the Internet Computer Protocol (ICP).",
        tags: ["React.js", "ICP Blockchain", "Motoko"],
        accent: "violet",
        icon: "flask"
    },
    {
        id: "news",
        title: "News Application",
        copy: "Built a dynamic web application to display and filter the latest news across categories like Sports, Politics, and Tech. Included features for pagination and saving favorite articles.",
        tags: ["React.js", "Material UI", "CurrentsAPI"],
        accent: "pink",
        icon: "news"
    },
    {
        id: "gpt",
        title: "ChatGPT Clone",
        copy: "Explored OpenAI capabilities by building a functional AI chat interface to gain a better understanding of LLM integration and conversational web apps.",
        tags: ["Node.js", "Express.js", "OpenAI API"],
        accent: "green",
        icon: "code"
    }
];

const MORE_IDS = [102, 107, 106, 108, 110, 111];

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

function ProjectIcon({ type }) {
    if (type === "chat") {
        return (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        );
    }
    if (type === "flask") {
        return (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        );
    }
    if (type === "news") {
        return (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" />
            </svg>
        );
    }
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    );
}

function Container() {
    const [chatOpen, setChatOpen] = useState(false);

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
        document.body.style.overflow = chatOpen ? "hidden" : "";
        return function () {
            document.body.classList.remove("chat-open");
            document.body.style.overflow = "";
        };
    }, [chatOpen]);

    useEffect(function () {
        const stacks = document.querySelectorAll(".site-stack");
        if (!stacks.length) {
            return undefined;
        }

        let frame = 0;

        function canStack() {
            return window.matchMedia("(min-width: 1101px)").matches
                && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }

        function reset() {
            stacks.forEach(function (stack) {
                const card = stack.querySelector(".site-stack-card");
                if (card) {
                    card.style.transform = "";
                    card.style.filter = "";
                }
            });
        }

        function update() {
            if (!canStack()) {
                reset();
                return;
            }
            stacks.forEach(function (stack, index) {
                const card = stack.querySelector(".site-stack-card");
                if (!card) {
                    return;
                }
                const next = stacks[index + 1];
                if (!next) {
                    card.style.transform = "scale(1)";
                    card.style.filter = "brightness(1)";
                    return;
                }
                const currentBox = stack.getBoundingClientRect();
                const nextBox = next.getBoundingClientRect();
                const overlap = Math.max(0, currentBox.bottom - nextBox.top);
                const progress = Math.min(1, overlap / Math.max(currentBox.height * 0.65, 1));
                const scale = 1 - progress * 0.06;
                const brightness = 1 - progress * 0.12;
                card.style.transform = "scale(" + scale.toFixed(4) + ")";
                card.style.filter = "brightness(" + brightness.toFixed(3) + ")";
            });
        }

        function onScroll() {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        update();

        return function () {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(frame);
            reset();
        };
    }, []);

    const moreWork = MORE_IDS.map(projectById).filter(Boolean);

    return (
        <>
            <CustomCursor />
            <SiteEffects />
            <div className="mesh-track" aria-hidden="true">
                <div className="mesh-bg" />
            </div>
            <div className="site-grain" aria-hidden="true" />
            <div className="site-progress" aria-hidden="true">
                <span className="site-progress-bar" />
            </div>

            <div className="site-shell">
                <aside className="site-aside">
                    <GlassPanel>
                        <div className="site-status">
                            <span className="site-status-dot" />
                            <span>Available for Hire</span>
                        </div>

                        <h1 className="site-name">Meghsham Jade</h1>
                        <h2 className="site-role">
                            <Typewriter />
                        </h2>
                        <p className="site-bio">
                            Dedicated and efficient developer with expertise in the MERN stack, Next.js, and an emerging specialization in blockchain development using ICP. Eager to expand into cutting-edge development practices.
                        </p>

                        <div className="site-pills">
                            {TECH_PILLS.map(function (pill) {
                                return (
                                    <span className="site-pill" key={pill}>{pill}</span>
                                );
                            })}
                        </div>

                        <div className="site-profile-foot">
                            <div className="site-meta-grid">
                                <div>
                                    <p className="site-meta-label">Education</p>
                                    <p className="site-meta-value">
                                        B.E. E&TC (2021–2026)
                                        <span>JSPM BSIOTR / SPPU</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="site-meta-label">Location</p>
                                    <p className="site-meta-value">Pune, Maharashtra</p>
                                </div>
                            </div>

                            <div className="site-socials">
                                <a className="interactive" href="https://github.com/Meghsham15" target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a className="interactive" href="https://www.linkedin.com/in/meghsham-jade-2a3406218/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            </div>

                            <div className="site-actions">
                                <a className="site-mail interactive is-magnetic" href="mailto:meghshamjade.contact@gmail.com">
                                    meghshamjade.contact@gmail.com
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                                <div className="site-btn-row">
                                    <button type="button" className="site-ghost interactive is-magnetic" onClick={openResume}>
                                        View resume
                                    </button>
                                    <button type="button" className="site-ask interactive is-magnetic" onClick={function () { setChatOpen(true); }}>
                                        Ask AI
                                    </button>
                                </div>
                                <a className="site-phone interactive" href="tel:+919325366493">+91 9325366493</a>
                            </div>
                        </div>
                    </GlassPanel>
                </aside>

                <main className="site-main">
                    <GlassPanel className="site-block">
                        <h2 className="site-heading">Professional Experience</h2>
                        <div className="site-job">
                            <div className="site-job-dot is-now" />
                            <h4>Full Stack Developer</h4>
                            <p className="site-job-meta site-mono is-now">Suscin Innovation Labs | Jul 2024 - Present</p>
                            <p>Developing end-to-end web applications, implementing modern web technologies, and contributing to frontend and backend development using MERN stack technologies.</p>
                        </div>
                        <div className="site-job">
                            <div className="site-job-dot" />
                            <h4>JavaScript Developer Intern</h4>
                            <p className="site-job-meta site-mono">Shunyadotek Company | Nov 2022 - Apr 2023</p>
                            <p>Developed web applications using core JavaScript frameworks, collaborated with senior developers on client projects, and enhanced debugging and testing skills.</p>
                        </div>
                    </GlassPanel>

                    <h2 className="site-heading is-loose">Selected Projects</h2>

                    <div className="site-stack-pin">
                        {FEATURED.map(function (item, index) {
                            const live = typeof item.id === "number" ? projectById(item.id) : null;
                            return (
                                <div className="site-stack" data-stack={index + 1} key={item.title}>
                                    <div className="site-stack-card">
                                        <GlassPanel tilt>
                                            <div className="site-project-top">
                                                <h3>{item.title}</h3>
                                                <div className={"site-project-icon " + item.accent}>
                                                    <ProjectIcon type={item.icon} />
                                                </div>
                                            </div>
                                            {live && live.img ? (
                                                <img className="site-project-media" src={live.img} alt={item.title + " screenshot"} />
                                            ) : null}
                                            <p className="site-project-copy">{item.copy}</p>
                                            <div className="site-tags">
                                                {item.tags.map(function (tag) {
                                                    return (
                                                        <span className="site-tag site-mono" key={tag}>{tag}</span>
                                                    );
                                                })}
                                            </div>
                                            {live && live.link ? (
                                                <a className="site-project-link interactive" href={live.link} target="_blank" rel="noopener noreferrer">
                                                    Open project
                                                </a>
                                            ) : null}
                                        </GlassPanel>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <GlassPanel className="site-block">
                        <h2 className="site-heading">Technical skills</h2>
                        <div className="site-skill-grid">
                            {skills.map(function (skill) {
                                return (
                                    <div className="site-skill" key={skill.id} data-percent={skill.percent}>
                                        <img src={skill.img} alt={skill.name} />
                                        <span className="site-skill-name">{skill.name}</span>
                                        <span className="site-skill-pct site-mono">0%</span>
                                        <div className="site-bar">
                                            <span style={{ "--bar": skill.percent + "%" }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </GlassPanel>

                    <GlassPanel className="site-block">
                        <h2 className="site-heading">How I work</h2>
                        <div className="site-strengths">
                            {devSkills.map(function (item) {
                                return (
                                    <span className="site-strength" key={item.id}>
                                        <img src={item.img} alt="" />
                                        {item.label}
                                    </span>
                                );
                            })}
                        </div>
                    </GlassPanel>

                    <GlassPanel className="site-block">
                        <h2 className="site-heading">More work</h2>
                        <div className="site-more">
                            {moreWork.map(function (item) {
                                return (
                                    <a className="interactive" key={item.id} href={item.link} target="_blank" rel="noopener noreferrer">
                                        {item.img ? <img src={item.img} alt={item.name + " screenshot"} /> : null}
                                        <h4>{item.name}</h4>
                                        <p>{item.des}</p>
                                    </a>
                                );
                            })}
                        </div>
                    </GlassPanel>
                </main>
            </div>

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

export default Container;
