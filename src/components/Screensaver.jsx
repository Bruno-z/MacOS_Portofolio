import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

const IDLE_DELAY = 20_000;

const BUBBLES = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: 20 + Math.random() * 60,
    left: Math.random() * 100,
    color: [
        "rgba(255,255,255,0.12)",
        "rgba(120,160,255,0.15)",
        "rgba(180,120,255,0.13)",
        "rgba(100,220,255,0.12)",
    ][Math.floor(Math.random() * 4)],
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
}));

const Screensaver = () => {
    const overlayRef = useRef(null);
    const bubblesRef = useRef([]);
    const timerRef = useRef(null);
    const tweensRef = useRef([]);
    const [visible, setVisible] = useState(false);
    const [time, setTime] = useState(new Date());

    // Horloge
    useEffect(() => {
        if (!visible) return;
        const id = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(id);
    }, [visible]);

    const show = () => {
        setVisible(true);
        const el = overlayRef.current;
        if (!el) return;
        gsap.set(el, { display: "flex", opacity: 0 });
        gsap.to(el, { opacity: 1, duration: 0.8, ease: "power2.inOut" });

        // Animer les bulles
        bubblesRef.current.forEach((b, i) => {
            if (!b) return;
            const def = BUBBLES[i];
            gsap.set(b, { y: "100vh" });
            const tween = gsap.to(b, {
                y: "-120vh",
                duration: def.duration,
                delay: def.delay,
                ease: "none",
                repeat: -1,
            });
            tweensRef.current.push(tween);
        });
    };

    const hide = () => {
        const el = overlayRef.current;
        if (!el) return;
        gsap.to(el, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => {
                gsap.set(el, { display: "none" });
                setVisible(false);
                tweensRef.current.forEach((t) => t.kill());
                tweensRef.current = [];
            },
        });
    };

    useEffect(() => {
        const reset = () => {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(show, IDLE_DELAY);
        };

        const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
        events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
        reset(); // démarre le timer initial

        return () => {
            clearTimeout(timerRef.current);
            events.forEach((e) => window.removeEventListener(e, reset));
        };
    }, []);

    const handleDismiss = () => {
        hide();
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(show, IDLE_DELAY);
    };

    const hours = time.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    const date = time.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

    return createPortal(
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9990] hidden items-center justify-center overflow-hidden cursor-pointer select-none"
            style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(2px)" }}
            onClick={handleDismiss}
            onKeyDown={handleDismiss}
        >
            {/* Bulles flottantes */}
            {BUBBLES.map((b, i) => (
                <div
                    key={b.id}
                    ref={(el) => (bubblesRef.current[i] = el)}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: b.size,
                        height: b.size,
                        left: `${b.left}%`,
                        bottom: 0,
                        background: b.color,
                        filter: "blur(1px)",
                    }}
                />
            ))}

            {/* Horloge */}
            <div className="relative z-10 flex flex-col items-center gap-3 pointer-events-none">
                <p className="text-white font-thin tracking-widest" style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}>
                    {hours}
                </p>
                <p className="text-white/50 text-lg tracking-wide capitalize">{date}</p>
                <p className="text-white/25 text-sm mt-4 tracking-widest uppercase">Cliquer pour continuer</p>
            </div>
        </div>,
        document.body
    );
};

export default Screensaver;
