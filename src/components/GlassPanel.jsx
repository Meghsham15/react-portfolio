import { useRef } from "react";

function GlassPanel({ children, className, tilt, as: Tag = "div", ...rest }) {
    const ref = useRef(null);
    const extra = className ? " " + className : "";

    function handleMove(event) {
        const panel = ref.current;
        if (!panel) {
            return;
        }
        const rect = panel.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        panel.style.setProperty("--mouse-x", x + "px");
        panel.style.setProperty("--mouse-y", y + "px");

        if (!tilt) {
            return;
        }
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            return;
        }
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        panel.style.transform = "perspective(1000px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
        panel.style.transition = "none";
    }

    function handleLeave() {
        const panel = ref.current;
        if (!panel || !tilt) {
            return;
        }
        panel.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        panel.style.transition = "transform 0.6s cubic-bezier(0.2, 1, 0.2, 1)";
    }

    return (
        <Tag
            ref={ref}
            className={"site-glass" + (tilt ? " is-tilt interactive-card" : "") + extra}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            {...rest}
        >
            <div className={"site-glass-inner" + (tilt ? " has-depth" : "")}>{children}</div>
        </Tag>
    );
}

export default GlassPanel;
