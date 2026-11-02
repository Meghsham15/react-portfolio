import { useEffect } from "react";

function SiteEffects() {
    useEffect(function () {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        let moveFrame = 0;

        function onMouseMove(event) {
            cancelAnimationFrame(moveFrame);
            moveFrame = requestAnimationFrame(function () {
                document.documentElement.style.setProperty("--lx", event.clientX + "px");
                document.documentElement.style.setProperty("--ly", event.clientY + "px");
            });
        }

        if (fine && !reduce) {
            window.addEventListener("mousemove", onMouseMove, { passive: true });
        }

        return function () {
            cancelAnimationFrame(moveFrame);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return null;
}

export default SiteEffects;
