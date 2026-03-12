import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const FONT_SIZE = 15;

const PortfolioEasterEgg = () => {
    const overlayRef = useRef(null);
    const canvasRef = useRef(null);
    const rafRef = useRef(null);
    const msgRef = useRef(null);
    const audioCtxRef = useRef(null);

    const startMatrix = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d");
        const cols = Math.floor(canvas.width / FONT_SIZE);
        const drops = Array(cols).fill(1);

        const draw = () => {
            ctx.fillStyle = "rgba(0,0,0,0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${FONT_SIZE}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = CHARS[Math.floor(Math.random() * CHARS.length)];
                ctx.fillStyle = drops[i] <= 1 ? "#ffffff" : "#00ff41";
                ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
                if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            rafRef.current = requestAnimationFrame(draw);
        };
        draw();
    };

    const stopMatrix = () => {
        cancelAnimationFrame(rafRef.current);
    };

    const playMatrixSound = () => {
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;
        const master = ctx.createGain();
        master.gain.setValueAtTime(0, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.4);
        master.gain.setValueAtTime(0.25, ctx.currentTime + 5.5);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 6.5);
        master.connect(ctx.destination);

        // Drone grave
        const drone = ctx.createOscillator();
        drone.type = "sine";
        drone.frequency.value = 55;
        const droneGain = ctx.createGain();
        droneGain.gain.value = 0.5;
        drone.connect(droneGain);
        droneGain.connect(master);
        drone.start();
        drone.stop(ctx.currentTime + 6.7);

        // Clics numériques aléatoires
        const scheduleClick = (when) => {
            if (when > ctx.currentTime + 5.7) return;
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = "square";
            osc.frequency.value = 800 + Math.random() * 800;
            g.gain.setValueAtTime(0.08, when);
            g.gain.exponentialRampToValueAtTime(0.0001, when + 0.04);
            osc.connect(g);
            g.connect(master);
            osc.start(when);
            osc.stop(when + 0.05);
            const next = when + 0.08 + Math.random() * 0.07;
            setTimeout(() => scheduleClick(ctx.currentTime + 0.05), (next - ctx.currentTime) * 1000 - 50);
        };
        scheduleClick(ctx.currentTime + 0.5);
    };

    const stopSound = () => {
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
    };

    const typeMessage = () => {
        const el = msgRef.current;
        if (!el) return;
        const lines = [
            "> SIMULATION TERMINÉE",
            "> Vous venez de finir votre simulation.",
            "> Bienvenue dans le monde réel.",
        ];
        el.innerHTML = "";
        let lineIdx = 0;
        let charIdx = 0;

        const tick = () => {
            if (lineIdx >= lines.length) return;
            const line = lines[lineIdx];
            if (charIdx === 0 && lineIdx > 0) el.innerHTML += "<br/>";
            el.innerHTML += line[charIdx];
            charIdx++;
            if (charIdx >= line.length) {
                lineIdx++;
                charIdx = 0;
                setTimeout(tick, 300);
            } else {
                setTimeout(tick, 45);
            }
        };
        tick();
    };

    useEffect(() => {
        const handler = ({ data }) => {
            if (data?.type !== "portfolio-easter-egg") return;
            const el = overlayRef.current;
            if (!el) return;

            gsap.killTweensOf(el);
            stopMatrix();
            stopSound();
            gsap.set(el, { display: "flex", opacity: 0 });
            gsap.to(el, {
                opacity: 1,
                duration: 0.3,
                onComplete: () => {
                    startMatrix();
                    playMatrixSound();
                    setTimeout(typeMessage, 800);

                    gsap.to(el, {
                        opacity: 0,
                        duration: 0.6,
                        delay: 6.0,
                        onComplete: () => {
                            gsap.set(el, { display: "none" });
                            stopMatrix();
                            stopSound();
                            if (msgRef.current) msgRef.current.innerHTML = "";
                        },
                    });
                },
            });
        };

        window.addEventListener("message", handler);
        return () => {
            window.removeEventListener("message", handler);
            stopMatrix();
            stopSound();
        };
    }, []);

    return createPortal(
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] hidden items-center justify-center"
            style={{ background: "rgba(0,0,0,0.92)" }}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div
                className="relative z-10 flex flex-col items-center justify-center px-12 py-8 rounded-xl"
                style={{
                    background: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(0,255,65,0.2)",
                    boxShadow: "0 0 40px rgba(0,255,65,0.08)",
                }}
            >
                <div
                    ref={msgRef}
                    className="font-mono text-lg leading-9 text-center"
                    style={{
                        color: "#00ff41",
                        textShadow: "0 0 10px #00ff41, 0 0 20px #00ff41",
                    }}
                />
            </div>
        </div>,
        document.body
    );
};

export default PortfolioEasterEgg;
