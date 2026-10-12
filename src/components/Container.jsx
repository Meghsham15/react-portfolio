import React, { useCallback, useEffect, useRef, useState } from "react";
import LeftContainer from "./LeftContainer.jsx";
import RightContainer from "./RightContainer.jsx";
import MidContainer from "./MidContainer.jsx";
import Footer from "./Footer.jsx";
import botIcon from "./icons/bot.svg";

const SECTION_IDS = ["intro", "skills", "projects"];

function Container(props) {
    const midRef = useRef(null);
    const [activeSection, setActiveSection] = useState("intro");
    const [navReady, setNavReady] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);

    const setSectionIfChanged = useCallback(function (id) {
        setActiveSection(function (current) {
            return current === id ? current : id;
        });
    }, []);

    const scrollToSection = useCallback(function (id) {
        const root = midRef.current;
        const section = root && root.querySelector("#" + id);
        if (!root || !section) {
            return;
        }
        const nextTop = root.scrollTop + (section.getBoundingClientRect().top - root.getBoundingClientRect().top);
        root.scrollTo({ top: Math.max(0, nextTop), behavior: "smooth" });
        setSectionIfChanged(id);
    }, [setSectionIfChanged]);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setNavReady(true);
            const hash = (window.location.hash || "").replace("#", "");
            if (SECTION_IDS.indexOf(hash) !== -1) {
                scrollToSection(hash);
            }
        });
        return () => cancelAnimationFrame(frame);
    }, [scrollToSection]);

    return (
        <div className={"container" + (chatOpen ? " is-chat-open" : "")}>
            <LeftContainer />
            <MidContainer
                scrollRef={midRef}
                activeSection={activeSection}
                onSectionChange={setSectionIfChanged}
                onOpenChat={() => setChatOpen(true)}
            />
            <RightContainer
                chatOpen={chatOpen}
                onCloseChat={() => setChatOpen(false)}
                setLoader={props.setLoader}
                setComments={props.setComments}
                comments={props.comments}
                setAuth={props.setAuth}
                authStatus={props.isAuth}
            />
            <Footer
                activeSection={activeSection}
                navReady={navReady}
                onNavigate={scrollToSection}
            />
            <button
                type="button"
                className="chatFab"
                onClick={() => setChatOpen(true)}
                aria-label="Ask AI"
            >
                <img src={botIcon} alt="" />
                <span>Ask AI</span>
            </button>
        </div>
    );
}

export default Container;
