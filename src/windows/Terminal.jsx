import React, { useEffect, useRef } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { techStack } from "#constants/index.js";
import { Check } from "lucide-react";
import WindowControls from "#components/WindowControls.jsx";
import gsap from "gsap";
import useWindowStore from "#store/window.js";

// Animation lettre par lettre pour les catégories
const renderLetters = (text) => {
    return [...text].map((char, i) => (
        <span key={i} style={{ display: "inline-block", opacity: 0 }}>
      {char === " " ? "\u00A0" : char}
    </span>
    ));
};

const playKeyboard = () => {
    const ctx = new AudioContext();
    const totalDuration = 1.5;
    const clickCount = 25;

    for (let i = 0; i < clickCount; i++) {
        const when = ctx.currentTime + (i / clickCount) * totalDuration * (0.9 + Math.random() * 0.2);
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = 600 + Math.random() * 300;
        g.gain.setValueAtTime(0.07, when);
        g.gain.exponentialRampToValueAtTime(0.0001, when + 0.035);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(when);
        osc.stop(when + 0.04);
    }

    setTimeout(() => ctx.close(), (totalDuration + 0.2) * 1000);
};

const Terminal = () => {
    const listRef = useRef([]);
    const { windows } = useWindowStore();
    const isOpen = windows["terminal"].isOpen; // récupération de l'état d'ouverture

    useEffect(() => {
        if (!isOpen) return; // ne rien faire si la fenêtre est fermée
        playKeyboard();

        listRef.current.forEach((el, idx) => {
            if (!el) return;

            // Animation catégories
            const categoryLetters = el.querySelectorAll("h3 span");
            gsap.to(categoryLetters, {
                opacity: 1,
                y: 0,
                duration: 0.05,
                stagger: 0.02,
                ease: "power1.out",
                delay: idx * 0.2,
            });

            // Animation technologies mot par mot
            const techWords = el.querySelectorAll("p span");
            techWords.forEach((word, wordIdx) => {
                const letters = [...word.textContent].map((char) => {
                    const span = document.createElement("span");
                    span.style.display = "inline-block";
                    span.style.opacity = "0";
                    span.textContent = char;
                    return span;
                });

                word.textContent = "";
                letters.forEach((span) => word.appendChild(span));

                gsap.to(letters, {
                    opacity: 1,
                    y: 0,
                    duration: 0.05,
                    stagger: 0.02,
                    ease: "power1.out",
                    delay: idx * 0.2 + wordIdx * 0.05,
                });
            });
        });
    }, [isOpen]); // <-- dépendance sur isOpen

    return (
        <>
            <div id="window-header">
                <WindowControls target="terminal" />
                <h2>Mes Compétences</h2>
            </div>

            <div className="techstack">
                <p>
                    <span className="font-bold">@Zilio % </span> Compétences
                </p>

                <div className="label">
                    <p className="w-70">Category</p>
                    <p>Technologies</p>
                </div>

                <ul className="content space-y-6">
                    {techStack.map(({ category, items }, index) => (
                        <li
                            key={category}
                            ref={(el) => (listRef.current[index] = el)}
                            className="grid grid-cols-[30px_200px_1fr] items-start gap-2"
                        >
                            <Check className="check mt-1" size={18} />

                            {/* Catégorie animée lettre par lettre */}
                            <h3 className="font-semibold whitespace-nowrap text-[#00A154]">{renderLetters(category)}</h3>

                            {/* Technologies: mot par mot avec animation */}
                            <p className="flex flex-wrap gap-1">
                                {items.map((item, i) => (
                                    <span key={i} style={{ whiteSpace: "nowrap" }}>
                    {item}
                                        {i < items.length - 1 ? ", " : ""}
                  </span>
                                ))}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const TerminalWindows = WindowWrapper(Terminal, "terminal");

export default TerminalWindows;