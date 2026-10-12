import { useEffect, useRef } from "react";

function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (!finePointer) {
            return undefined;
        }

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) {
            return undefined;
        }

        let ringX = 0;
        let ringY = 0;
        let targetX = 0;
        let targetY = 0;
        let frame;

        function move(event) {
            const native = event.target.closest("input, textarea, select, iframe, .site-chat, .resumeCont");
            if (native) {
                document.body.classList.remove("cursor-live");
                return;
            }
            document.body.classList.add("cursor-live");
            targetX = event.clientX;
            targetY = event.clientY;
            dot.style.left = targetX + "px";
            dot.style.top = targetY + "px";
            if (reduceMotion) {
                ring.style.left = targetX + "px";
                ring.style.top = targetY + "px";
            }
        }

        function tick() {
            ringX += (targetX - ringX) * 0.18;
            ringY += (targetY - ringY) * 0.18;
            ring.style.left = ringX + "px";
            ring.style.top = ringY + "px";
            frame = requestAnimationFrame(tick);
        }

        function onOver(event) {
            if (event.target.closest("a, button, .interactive, .interactive-card")) {
                document.body.classList.add("hovering");
            }
        }

        function onOut(event) {
            if (event.target.closest("a, button, .interactive, .interactive-card")) {
                document.body.classList.remove("hovering");
            }
        }

        window.addEventListener("mousemove", move);
        document.addEventListener("mouseover", onOver);
        document.addEventListener("mouseout", onOut);
        if (!reduceMotion) {
            frame = requestAnimationFrame(tick);
        }

        return () => {
            window.removeEventListener("mousemove", move);
            document.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseout", onOut);
            cancelAnimationFrame(frame);
            document.body.classList.remove("hovering");
            document.body.classList.remove("cursor-live");
        };
    }, []);

    return (
        <>
            <div className="cursor-dot" ref={dotRef} />
            <div className="cursor-ring" ref={ringRef} />
        </>
    );
}

export default CustomCursor;
