import { useEffect, useState } from "react";

function useMaxWidth(px) {
    const [matches, setMatches] = useState(function () {
        if (typeof window === "undefined" || !window.matchMedia) {
            return false;
        }
        return window.matchMedia("(max-width: " + px + "px)").matches;
    });

    useEffect(() => {
        const media = window.matchMedia("(max-width: " + px + "px)");
        function update() {
            setMatches(media.matches);
        }
        update();
        if (media.addEventListener) {
            media.addEventListener("change", update);
        } else {
            media.addListener(update);
        }
        return () => {
            if (media.removeEventListener) {
                media.removeEventListener("change", update);
            } else {
                media.removeListener(update);
            }
        };
    }, [px]);

    return matches;
}

export default useMaxWidth;
