import { useEffect } from "react";
import gsap from "gsap";

const CursorTrail = () => {
    useEffect(() => {
        let lastTime = 0;

        const handleMouseMove = (e) => {
            const now = Date.now();
            if (now - lastTime < 25) return;
            lastTime = now;

            const size = Math.random() * 6 + 3;
            const particle = document.createElement("div");
            Object.assign(particle.style, {
                position: "fixed",
                left: `${e.clientX}px`,
                top: `${e.clientY}px`,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.55)",
                pointerEvents: "none",
                zIndex: "1",
                transform: "translate(-50%, -50%)",
            });
            document.body.appendChild(particle);

            gsap.to(particle, {
                opacity: 0,
                scale: 0,
                y: -(8 + Math.random() * 12),
                duration: 0.5 + Math.random() * 0.3,
                ease: "power2.out",
                onComplete: () => particle.remove(),
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return null;
};

export default CursorTrail;
