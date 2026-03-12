import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

const DesktopCat = () => {
    const catRef = useRef(null);
    const walkTween = useRef(null);

    const walk = () => {
        const el = catRef.current;
        if (!el) return;

        const goRight = Math.random() > 0.5;

        gsap.set(el, {
            display: "block",
            x: goRight ? -80 : window.innerWidth + 80,
            scaleX: goRight ? 1 : -1,
        });

        // Oscillation verticale (effet pas-de-marche)
        const bounce = gsap.to(el, {
            y: -8,
            duration: 0.3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
        });

        // Traversée
        walkTween.current = gsap.to(el, {
            x: goRight ? window.innerWidth + 80 : -80,
            duration: 7,
            ease: "none",
            onComplete: () => {
                bounce.kill();
                gsap.set(el, { display: "none", y: 0 });
            },
        });
    };

    useEffect(() => {
        // Première apparition rapide
        const firstTimer = setTimeout(walk, 10_000);

        // Ensuite toutes les ~60s ±15s
        const interval = setInterval(() => {
            const jitter = (Math.random() - 0.5) * 30_000;
            setTimeout(walk, Math.max(0, jitter));
        }, 60_000);

        return () => {
            clearTimeout(firstTimer);
            clearInterval(interval);
            walkTween.current?.kill();
        };
    }, []);

    return createPortal(
        <div
            ref={catRef}
            className="fixed z-[9989] pointer-events-none select-none hidden"
            style={{ bottom: "80px", fontSize: "2.5rem", lineHeight: 1 }}
        >
            🐱
        </div>,
        document.body
    );
};

export default DesktopCat;
