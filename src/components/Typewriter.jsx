import { useEffect, useState } from "react";

const PHRASES = ["Full-Stack Engineer", "Backend Architect", "AI Integrator"];

function Typewriter() {
    const [text, setText] = useState(PHRASES[0]);

    useEffect(function () {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setText(PHRASES[0]);
            return undefined;
        }

        let count = 0;
        let index = PHRASES[0].length;
        let isDeleting = true;
        let timeoutId = 0;

        function type() {
            const current = PHRASES[count % PHRASES.length];

            if (isDeleting) {
                index -= 1;
            } else {
                index += 1;
            }

            setText(current.slice(0, Math.max(0, index)));

            let speed = isDeleting ? 50 : 100;

            if (!isDeleting && index === current.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && index === 0) {
                isDeleting = false;
                count += 1;
                speed = 500;
            }

            timeoutId = window.setTimeout(type, speed);
        }

        timeoutId = window.setTimeout(type, 2000);

        return function () {
            window.clearTimeout(timeoutId);
        };
    }, []);

    return (
        <span className="site-typewriter">
            <span className="site-type-text">{text}</span>
            <span className="site-type-cursor" aria-hidden="true">|</span>
        </span>
    );
}

export default Typewriter;
