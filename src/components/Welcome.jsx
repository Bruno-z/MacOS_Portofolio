import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window.js";

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
      {char === " " ? "\u00A0" : char}
    </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return () => {};

    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];

    const animateLetter = (letter, weight, duration = 0.25) =>
        gsap.to(letter, {
            duration,
            ease: "power2.out",
            fontVariationSettings: `'wght' ${weight}`,
        });

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w / 2));
            const intensity = Math.exp(-(distance ** 2) / 2000);

            animateLetter(letter, min + (max - min) * intensity);
        });
    };

    const handleMouseLeave = () => {
        letters.forEach((letter) => animateLetter(letter, base, 0.3));
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };
};

const TOUR_STEPS = [
    { key: "terminal", delay: 0,    x: -230, y: -120 },
    { key: "safari",   delay: 750,  x:  150, y:  -90 },
    { key: "finder",   delay: 1500, x: -170, y:  110 },
    { key: "contact",  delay: 2250, x:  210, y:  130 },
];

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const [touring, setTouring] = useState(false);
    const { openWindow, closeWindow, windows } = useWindowStore();

    useGSAP(() => {
        const cleanTitle = setupTextHover(titleRef.current, "title");
        const cleanSubtitle = setupTextHover(subtitleRef.current, "subtitle");
        return () => { cleanTitle(); cleanSubtitle(); };
    }, []);

    const startTour = () => {
        if (touring) return;
        setTouring(true);

        Object.entries(windows).forEach(([key, win]) => {
            if (win.isOpen) closeWindow(key);
        });

        TOUR_STEPS.forEach(({ key, delay, x, y }) => {
            setTimeout(() => {
                openWindow(key);
                setTimeout(() => {
                    const el = document.getElementById(key);
                    if (el) gsap.to(el, { x, y, duration: 0.6, ease: "power2.out" });
                }, 700);
            }, delay);
        });

        setTimeout(() => setTouring(false), TOUR_STEPS.at(-1).delay + 1500);
    };

    return (
        <section id="welcome">
            <p ref={subtitleRef} className="text-[#2D1A90]">
                {renderText(
                    "Bonjour, moi c'est Bruno, bienvenue dans mon",
                    "text-4xl font-georama",
                    100
                )}
            </p>

            <h1 ref={titleRef} className="mt-7">
                {renderText("portfolio", "text-9xl font-georama", 400)}
            </h1>

            <button
                onClick={startTour}
                disabled={touring}
                className="mt-10 px-8 py-3 rounded-full border border-white/60 bg-black/25 backdrop-blur-sm text-white hover:bg-black/40 disabled:opacity-40 cursor-pointer disabled:cursor-default transition-all duration-300 text-sm tracking-[0.2em] font-georama uppercase shadow-lg"
            >
                {touring ? "En cours…" : "Découvrir →"}
            </button>

            <div className="small-screen">
                <p>
                    Ce portfolio est designé uniquement pour les écrans d'ordinateur et
                    tablettes.
                </p>
            </div>
        </section>
    );
};

export default Welcome;
