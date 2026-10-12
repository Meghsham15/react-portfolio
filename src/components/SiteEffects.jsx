import { useEffect } from "react";

function prefersFinePointer() {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function SiteEffects() {
    useEffect(function () {
        const readyFrame = requestAnimationFrame(function () {
            document.body.classList.add("site-ready");
        });

        const reduce = prefersReducedMotion();
        const fine = prefersFinePointer();
        let moveFrame = 0;
        let scrollFrame = 0;

        function onMouseMove(event) {
            cancelAnimationFrame(moveFrame);
            moveFrame = requestAnimationFrame(function () {
                document.documentElement.style.setProperty("--mx", (event.clientX / window.innerWidth).toFixed(4));
                document.documentElement.style.setProperty("--my", (event.clientY / window.innerHeight).toFixed(4));
            });
        }

        function onScroll() {
            cancelAnimationFrame(scrollFrame);
            scrollFrame = requestAnimationFrame(function () {
                const max = document.documentElement.scrollHeight - window.innerHeight;
                const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
                const bar = document.querySelector(".site-progress-bar");
                if (bar) {
                    bar.style.transform = "scaleY(" + progress.toFixed(4) + ")";
                }
            });
        }

        const magnets = [];
        function bindMagnetic(el) {
            function enter() {
                el.classList.add("is-magnet-hot");
            }
            function move(event) {
                if (reduce || !fine) {
                    return;
                }
                const rect = el.getBoundingClientRect();
                const x = event.clientX - (rect.left + rect.width / 2);
                const y = event.clientY - (rect.top + rect.height / 2);
                el.style.transform = "translate(" + (x * 0.22).toFixed(1) + "px, " + (y * 0.28).toFixed(1) + "px)";
            }
            function leave() {
                el.classList.remove("is-magnet-hot");
                el.style.transform = "";
            }
            el.addEventListener("mouseenter", enter);
            el.addEventListener("mousemove", move);
            el.addEventListener("mouseleave", leave);
            magnets.push({ el: el, enter: enter, move: move, leave: leave });
        }

        document.querySelectorAll(".is-magnetic").forEach(bindMagnetic);

        const skillObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add("is-in");
                const pct = entry.target.querySelector(".site-skill-pct");
                const target = Number(entry.target.getAttribute("data-percent") || "0");
                if (pct && !reduce && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = "1";
                    const start = performance.now();
                    function tick(now) {
                        const t = Math.min(1, (now - start) / 700);
                        const eased = 1 - Math.pow(1 - t, 3);
                        pct.textContent = Math.round(target * eased) + "%";
                        if (t < 1) {
                            requestAnimationFrame(tick);
                        }
                    }
                    requestAnimationFrame(tick);
                } else if (pct) {
                    pct.textContent = target + "%";
                }
                skillObserver.unobserve(entry.target);
            });
        }, { threshold: 0.35 });

        document.querySelectorAll(".site-skill").forEach(function (el) {
            skillObserver.observe(el);
        });

        if (fine && !reduce) {
            window.addEventListener("mousemove", onMouseMove, { passive: true });
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return function () {
            cancelAnimationFrame(readyFrame);
            cancelAnimationFrame(moveFrame);
            cancelAnimationFrame(scrollFrame);
            document.body.classList.remove("site-ready");
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("scroll", onScroll);
            magnets.forEach(function (item) {
                item.el.removeEventListener("mouseenter", item.enter);
                item.el.removeEventListener("mousemove", item.move);
                item.el.removeEventListener("mouseleave", item.leave);
                item.el.style.transform = "";
            });
            skillObserver.disconnect();
        };
    }, []);

    return null;
}

export default SiteEffects;
