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

        function place(x, y, instant) {
            targetX = x;
            targetY = y;
            dot.style.left = x + "px";
            dot.style.top = y + "px";
            if (instant || reduceMotion) {
                ringX = x;
                ringY = y;
                ring.style.left = x + "px";
                ring.style.top = y + "px";
            }
        }

        function move(event) {
            const native = event.target.closest("input, textarea, select, iframe, .resumeCont, .boot");
            if (native) {
                document.body.classList.remove("cursor-live");
                document.body.classList.add("cursor-native");
                return;
            }
            const wasNative = document.body.classList.contains("cursor-native");
            document.body.classList.remove("cursor-native");
            document.body.classList.add("cursor-live");
            place(event.clientX, event.clientY, wasNative);
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
            document.body.classList.remove("cursor-native");
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
