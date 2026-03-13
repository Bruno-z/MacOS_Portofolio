import React, { useEffect, useRef, useState } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { techStack } from "#constants/index.js";
import { Check } from "lucide-react";
import WindowControls from "#components/WindowControls.jsx";
import gsap from "gsap";
import useWindowStore from "#store/window.js";

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

const COMMANDS = {
    help: () =>
`Commandes disponibles :

  whoami       → Qui suis-je ?
  ls           → Liste des projets
  git log      → Historique de carrière
  cat about    → À propos de moi
  contact      → Coordonnées
  skills       → Retour aux compétences
  clear        → Effacer l'historique`,

    whoami: () =>
`Bruno Zilio
Développeur Full Stack — React · React Native · Java Spring Boot
Actuellement en mission chez SII (Airbus / Orange)
Disponible pour de nouveaux projets 🚀`,

    ls: () =>
`📁 Mon travail professionnel
   ├── SII/AIRBUS  —  WOIS
   ├── SII/ORANGE  —  WASAC
   ├── SII/AIRBUS  —  OCEAN
   └── ARSEAA      —  VBA

📁 Mes projets personnels
   ├── JOURNEO
   └── Site hommage à Arcane`,

    "git log": () =>
`commit 2024  SII / Airbus (WOIS)    Java Spring Boot, REST API, Elasticsearch
commit 2024  SII / Orange (WASAC)   React, AdonisJS, PostgreSQL
commit 2023  SII / Airbus (OCEAN)   React, Java Spring Boot
commit 2021  ARSEAA (VBA)           Excel VBA — application métier interne
commit 2022  IN-TACT (stage)        React Native, AdonisJS
commit 2019  VeryWell (stage)       Swift iOS — e-commerce Sheepy Sport
commit 2017  Wild Code School       Formation développeur web`,

    "cat about": () =>
`Développeur Full Stack passionné par les interfaces soignées
et les expériences utilisateur mémorables.

Je travaille principalement avec React, React Native et Java Spring Boot.
Ce portfolio en est la preuve — un vrai macOS dans le navigateur.

Ouvert aux opportunités CDI / freelance !`,

    contact: () =>
`Email    →  bruno.zilio@email.com
GitHub   →  github.com/Bruno-z
LinkedIn →  linkedin.com/in/bruno-zilio-00b565143`,

    skills: () => `→ Les compétences sont affichées ci-dessus.`,
};

const Terminal = () => {
    const listRef = useRef([]);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);
    const { windows } = useWindowStore();
    const isOpen = windows["terminal"].isOpen;

    const [cmdInput, setCmdInput] = useState("");
    const [cmdHistory, setCmdHistory] = useState([]);

    useEffect(() => {
        if (!isOpen) return;
        playKeyboard();

        listRef.current.forEach((el, idx) => {
            if (!el) return;

            const categoryLetters = el.querySelectorAll("h3 span");
            gsap.to(categoryLetters, {
                opacity: 1,
                y: 0,
                duration: 0.05,
                stagger: 0.02,
                ease: "power1.out",
                delay: idx * 0.2,
            });

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
    }, [isOpen]);

    // Auto-scroll quand l'historique grandit
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [cmdHistory]);

    const handleCommand = (e) => {
        e.preventDefault();
        const raw = cmdInput.trim();
        setCmdInput("");
        if (!raw) return;

        const cmd = raw.toLowerCase();

        if (cmd === "clear") {
            setCmdHistory([]);
            return;
        }

        const output = COMMANDS[cmd]
            ? COMMANDS[cmd]()
            : `zsh: command not found: ${raw}\nTape "help" pour voir les commandes disponibles.`;

        setCmdHistory((prev) => [...prev, { cmd: raw, output }]);
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="terminal" />
                <h2>Terminal</h2>
            </div>

            <div className="techstack" onClick={() => inputRef.current?.focus()}>
                <p>
                    <span className="font-bold">@Zilio % </span> skills
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
                            <h3 className="font-semibold whitespace-nowrap text-[#00A154]">{renderLetters(category)}</h3>
                            <p className="flex flex-wrap gap-1">
                                {items.map((item, i) => (
                                    <span key={i} style={{ whiteSpace: "nowrap" }}>
                                        {item}{i < items.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </p>
                        </li>
                    ))}
                </ul>

                {/* Zone interactive CLI */}
                <div className="footnote mt-6 border-t border-dashed pt-4">
                    {cmdHistory.length === 0 && (
                        <p className="text-xs text-gray-400 italic mb-3">
                            Terminal interactif — essaie <span className="text-[#00A154] not-italic font-bold">help</span> pour voir les commandes disponibles.
                        </p>
                    )}

                    {cmdHistory.map((item, i) => (
                        <div key={i} className="mb-3">
                            <p className="text-sm">
                                <span className="font-bold text-[#00A154]">@Zilio % </span>
                                {item.cmd}
                            </p>
                            <pre className="mt-1 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed font-roboto">
                                {item.output}
                            </pre>
                        </div>
                    ))}

                    <form
                        onSubmit={handleCommand}
                        className="flex items-center gap-2 mt-1 bg-[#00A154]/8 dark:bg-[#00A154]/10 rounded-md px-2 py-1.5 ring-1 ring-[#00A154]/20"
                    >
                        <span className="font-bold text-[#00A154] text-sm whitespace-nowrap">@Zilio % </span>
                        <input
                            ref={inputRef}
                            value={cmdInput}
                            onChange={(e) => setCmdInput(e.target.value)}
                            placeholder="tapez une commande…"
                            autoComplete="off"
                            spellCheck="false"
                            className="flex-1 bg-transparent outline-none text-sm font-roboto text-gray-800 dark:text-gray-200 placeholder:text-gray-400 placeholder:italic"
                        />
                    </form>
                    <div ref={bottomRef} />
                </div>
            </div>
        </>
    );
};

const TerminalWindows = WindowWrapper(Terminal, "terminal");

export default TerminalWindows;
