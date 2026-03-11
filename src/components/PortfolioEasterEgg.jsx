import { useEffect, useRef } from "react";
import gsap from "gsap";

const PortfolioEasterEgg = () => {
    const toastRef = useRef(null);

    useEffect(() => {
        const handler = ({ data }) => {
            if (data?.type !== "portfolio-easter-egg") return;
            const el = toastRef.current;
            if (!el) return;
            gsap.killTweensOf(el);
            gsap.fromTo(
                el,
                { scale: 0.7, opacity: 0, display: "flex" },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "back.out(1.4)",
                    onComplete: () =>
                        gsap.to(el, {
                            scale: 0.85,
                            opacity: 0,
                            duration: 0.35,
                            ease: "power2.in",
                            delay: 2.5,
                            onComplete: () => gsap.set(el, { display: "none" }),
                        }),
                }
            );
        };
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, []);

    return (
        <div
            ref={toastRef}
            className="fixed z-[9999] hidden flex-col items-center gap-4 bg-white/15 backdrop-blur-2xl border border-white/25 rounded-3xl px-12 py-8 shadow-2xl text-center"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
            <span className="text-5xl select-none">👀</span>
            <div>
                <p className="text-white text-xl font-bold leading-tight">Hé !</p>
                <p className="text-white/70 text-sm leading-snug mt-1">Tu es déjà ici…</p>
            </div>
        </div>
    );
};

export default PortfolioEasterEgg;
