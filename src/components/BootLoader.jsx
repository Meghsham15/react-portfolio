import { useEffect, useRef, useState } from "react";
import Images from "./Images";

function reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function BootLoader({ ready, onReveal, onDone }) {
    const [percent, setPercent] = useState(0);
    const [phase, setPhase] = useState("count");
    const [welcome, setWelcome] = useState(false);
    const onRevealRef = useRef(onReveal);
    const onDoneRef = useRef(onDone);
    const revealed = useRef(false);
    const skipped = useRef(false);
    onRevealRef.current = onReveal;
    onDoneRef.current = onDone;

    useEffect(function () {
        document.documentElement.classList.add("boot-lock");
        return function () {
            document.documentElement.classList.remove("boot-lock");
        };
    }, []);

    useEffect(function () {
        if (phase !== "count" || reducedMotion()) {
            return undefined;
        }
        const id = setInterval(function () {
            setPercent(function (value) {
                return value >= 100 ? 100 : value + 1;
            });
        }, 22);
        return function () {
            clearInterval(id);
        };
    }, [phase]);

    useEffect(function () {
        if (phase !== "count") {
            return undefined;
        }
        if (reducedMotion() && ready) {
            setPercent(100);
            setWelcome(true);
            setPhase("mark");
            return undefined;
        }
        if (skipped.current && ready) {
            setPhase("exit");
            return undefined;
        }
        if (percent < 100 || !ready) {
            return undefined;
        }
        const id = setTimeout(function () {
            setPhase("mark");
        }, 260);
        return function () {
            clearTimeout(id);
        };
    }, [percent, ready, phase]);

    useEffect(function () {
        if (phase !== "mark") {
            return undefined;
        }
        if (reducedMotion()) {
            const id = setTimeout(function () {
                setPhase("exit");
            }, 700);
            return function () {
                clearTimeout(id);
            };
        }
        const showWelcome = setTimeout(function () {
            setWelcome(true);
        }, 2000);
        const leave = setTimeout(function () {
            setPhase("sweep");
        }, 3600);
        return function () {
            clearTimeout(showWelcome);
            clearTimeout(leave);
        };
    }, [phase]);

    useEffect(function () {
        if (phase !== "sweep" && phase !== "exit") {
            return undefined;
        }
        if (!revealed.current) {
            revealed.current = true;
            onRevealRef.current();
        }
        if (phase !== "sweep") {
            return undefined;
        }
        const id = setTimeout(function () {
            setPhase("exit");
        }, reducedMotion() ? 40 : 1280);
        return function () {
            clearTimeout(id);
        };
    }, [phase]);

    useEffect(function () {
        if (phase !== "exit") {
            return undefined;
        }
        const id = setTimeout(function () {
            onDoneRef.current();
        }, reducedMotion() ? 40 : 460);
        return function () {
            clearTimeout(id);
        };
    }, [phase]);

    function skip() {
        skipped.current = true;
        if (ready) {
            setPhase("exit");
        }
    }

    return (
        <div className={"boot" + (phase === "mark" ? " is-mark" : "") + (phase === "sweep" ? " is-sweep" : "") + (phase === "exit" ? " is-exiting" : "")} aria-hidden={phase === "exit"}>
            <div className="boot-stage">
                <span className="boot-line" style={{ width: percent + "%" }} />
                <span className="boot-follow" />
                <p className="boot-pct">{percent}%</p>
            </div>
            <div className="boot-mark">
                <img className="boot-mark-logo" src={Images.mjLogo} alt="" />
                <p className={"boot-welcome" + (welcome ? " is-on" : "")}>Welcome</p>
            </div>
            <button type="button" className="boot-skip" onClick={skip}>Skip Intro</button>
        </div>
    );
}

export default BootLoader;
