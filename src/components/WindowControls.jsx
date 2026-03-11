import React from 'react'
import useWindowStore from "#store/window.js";
import gsap from "gsap";
import { playMinimize } from "#utils/sounds.js";

const WindowControls = ({ target }) => {
    const { closeWindow, minimizeWindow } = useWindowStore();

    const handleMinimize = () => {
        const el = document.getElementById(target);
        const dock = document.getElementById("dock");
        if (!el || !dock) { closeWindow(target); return; }

        playMinimize();

        const dockRect = dock.getBoundingClientRect();
        const winRect = el.getBoundingClientRect();

        gsap.to(el, {
            x: (dockRect.left + dockRect.width / 2) - (winRect.left + winRect.width / 2),
            y: dockRect.top - winRect.top + dockRect.height / 2,
            scale: 0.05,
            opacity: 0,
            duration: 0.45,
            ease: "power3.in",
            onComplete: () => {
                gsap.set(el, { x: 0, y: 0, scale: 1, opacity: 1 });
                minimizeWindow(target);
            },
        });
    };

    return (
        <div id="window-controls">
            <div className="close" onClick={() => closeWindow(target)} />
            <div className="minimize cursor-pointer" onClick={handleMinimize} />
            <div className="maximize" />
        </div>
    );
};

export default WindowControls;
