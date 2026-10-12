import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import IntroContainer from "./IntroContainer";
import SkillsContainer from "./SkillsContainer";
import ProjectsContainer from "./PorjectsContainer";

const SECTION_IDS = ["intro", "skills", "projects"];

function MidContainer({ scrollRef, activeSection, onSectionChange, onOpenChat }) {
    const lastSection = useRef("");

    function fadeEle(ele, animation) {
        document.querySelectorAll(ele).forEach(function (element) {
            element.style.animation = animation;
        });
    }

    function setSkillAnimations(on) {
        fadeEle("#fadeUp1, #fadeUp2, #fadeUp3", on ? "fadeUp 1s ease-in-out forwards" : "none");
        fadeEle("#fadeLeft1,#fadeLeft2,#fadeLeft3", on ? "fadeLeft 1s ease-in-out forwards" : "none");
        fadeEle("#fadeRight1,#fadeRight2,#fadeRight3,#fadeRight4", on ? "fadeRight 1s ease-in-out forwards" : "none");
        fadeEle(".skillsInner h1", on ? "fadeUpIn 1s ease-in-out forwards" : "none");
    }

    function setProjectAnimations(on) {
        const heading = document.querySelector(".projectsInner h1");
        const box = document.querySelector(".projectBox");
        if (heading) {
            heading.style.animation = on ? "fadeUpIn 1s ease-in-out forwards" : "none";
        }
        if (box) {
            box.style.animation = on ? "popUpIn 1s ease-in-out forwards" : "none";
        }
    }

    function setScrollHints(section) {
        const left = document.querySelector(".downScrollL");
        const right = document.querySelector(".downScrollR");
        if (!left || !right) {
            return;
        }
        if (section === "projects") {
            left.style.transform = "rotate(270deg)";
            right.style.transform = "rotate(270deg)";
            return;
        }
        if (section === "skills") {
            left.style.transform = "rotate(90deg)";
            right.style.transform = "rotate(270deg)";
            return;
        }
        left.style.transform = "rotate(90deg)";
        right.style.transform = "rotate(90deg)";
    }

    function sectionFromScroll(root) {
        const marker = root.getBoundingClientRect().top + root.clientHeight * 0.32;
        let current = SECTION_IDS[0];
        SECTION_IDS.forEach(function (id) {
            const el = root.querySelector("#" + id);
            if (el && el.getBoundingClientRect().top <= marker) {
                current = id;
            }
        });
        return current;
    }

    function handleScroll(e) {
        onSectionChange(sectionFromScroll(e.target));
    }

    useEffect(function () {
        if (lastSection.current === activeSection) {
            return;
        }
        lastSection.current = activeSection;
        setSkillAnimations(activeSection === "skills");
        setProjectAnimations(activeSection === "projects");
        setScrollHints(activeSection);
    }, [activeSection]);

    useEffect(function () {
        const root = scrollRef && scrollRef.current;
        if (!root) {
            return;
        }
        onSectionChange(sectionFromScroll(root));
    }, [scrollRef, onSectionChange]);

    return (
        <div ref={scrollRef} onScroll={handleScroll} className="midContainer">
            <div className="midMain">
                <Navbar onOpenChat={onOpenChat} />
                <IntroContainer />
                <SkillsContainer />
                <ProjectsContainer />
            </div>
        </div>
    );
}

export default MidContainer;
