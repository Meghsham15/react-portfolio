import { useEffect, useRef, useState } from "react";

const LINES = ["Opening the studio", "Tuning the glass", "Arranging the work"];

function reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function BootLoader({ ready, onReveal, onDone }) {
    const [phase, setPhase] = useState("loading");
    const [progress, setProgress] = useState(6);
    const [line, setLine] = useState(0);
    const startedAt = useRef(performance.now());
    const onRevealRef = useRef(onReveal);
    const onDoneRef = useRef(onDone);
    onRevealRef.current = onReveal;
    onDoneRef.current = onDone;

    useEffect(function () {
        document.documentElement.classList.add("boot-lock");
        return function () {
            document.documentElement.classList.remove("boot-lock");
        };
    }, []);

    useEffect(function () {
        if (phase !== "loading") {
            return undefined;
        }
        let frame = 0;
        function tick(now) {
            const elapsed = now - startedAt.current;
            const crept = 1 - Math.exp(-elapsed / 980);
            setProgress(6 + crept * 86);
            frame = requestAnimationFrame(tick);
        }
        frame = requestAnimationFrame(tick);
        return function () {
            cancelAnimationFrame(frame);
        };
    }, [phase]);

    useEffect(function () {
        if (phase !== "loading") {
            return undefined;
        }
        const id = setInterval(function () {
            setLine(function (current) {
                return (current + 1) % LINES.length;
            });
        }, 1100);
        return function () {
            clearInterval(id);
        };
    }, [phase]);

    useEffect(function () {
        if (!ready || phase !== "loading") {
            return undefined;
        }
        const minimum = reducedMotion() ? 240 : 1500;
        const wait = Math.max(0, minimum - (performance.now() - startedAt.current));
        const id = setTimeout(function () {
            setPhase("finishing");
        }, wait);
        return function () {
            clearTimeout(id);
        };
    }, [ready, phase]);

    useEffect(function () {
        if (phase !== "finishing") {
            return undefined;
        }
        const hold = reducedMotion() ? 40 : 420;
        const id = setTimeout(function () {
            onRevealRef.current();
            setPhase("exiting");
        }, hold);
        return function () {
            clearTimeout(id);
        };
    }, [phase]);

    useEffect(function () {
        if (phase !== "exiting") {
            return undefined;
        }
        const exitMs = reducedMotion() ? 220 : 920;
        const id = setTimeout(function () {
            onDoneRef.current();
        }, exitMs);
        return function () {
            clearTimeout(id);
        };
    }, [phase]);

    const shown = phase === "loading" ? progress : 100;
    const phrase = phase === "loading" ? LINES[line] : "Welcome";
    const count = String(Math.min(100, Math.round(shown))).padStart(2, "0");

    return (
        <div className={"boot" + (phase === "exiting" ? " is-exiting" : "")} aria-hidden={phase === "exiting"}>
            <div className="boot-mesh" aria-hidden="true">
                <span className="boot-orb boot-orb-a" />
                <span className="boot-orb boot-orb-b" />
            </div>
            <div className="boot-grain" aria-hidden="true" />
            <div className="boot-frame" aria-hidden="true" />

            <div className="boot-top">
                <span>MJ / Studio</span>
                <span className="boot-count">{count}</span>
            </div>

            <div className="boot-stage">
                <div className="boot-mark" aria-hidden="true">
                    <span className="boot-glow" />
                    <svg className="boot-ring" viewBox="0 0 140 140">
                        <defs>
                            <linearGradient id="boot-ring-grad" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#00f0ff" />
                                <stop offset="100%" stopColor="#7000ff" />
                            </linearGradient>
                        </defs>
                        <circle className="boot-ring-track" cx="70" cy="70" r="62" />
                        <circle className="boot-ring-arc" cx="70" cy="70" r="62" />
                    </svg>
                    <div className="boot-disc">MJ</div>
                </div>
                <p className="boot-kicker">Portfolio</p>
                <h1 className="boot-name">Meghsham Jade</h1>
                <p className="boot-role">Full Stack AI Developer</p>
                <div className="boot-meter" aria-hidden="true">
                    <span style={{ width: shown + "%" }} />
                </div>
            </div>

            <div className="boot-foot">
                <span>Pune, India</span>
                <span className="boot-live" role="status">{phrase}</span>
            </div>
        </div>
    );
}

export default BootLoader;
