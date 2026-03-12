import React from 'react'
import useWindowStore from "#store/window.js";
import gsap from "gsap";
import { playMinimize } from "#utils/sounds.js";

const WindowControls = ({ target }) => {
    const { closeWindow, minimizeWindow, focusWindow } = useWindowStore();

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

    const handleMaximize = () => {
        const el = document.getElementById(target);
        if (!el) return;
        focusWindow(target);

        if (!el.dataset.maximized) {
            el.dataset.maximized = "true";
            el.style.top = "50px";
            el.style.left = "0";
            el.style.transform = "none";
            gsap.to(el, {
                x: 0, y: 0,
                width: "100vw",
                height: "calc(100vh - 50px)",
                duration: 0.35,
                ease: "power3.inOut",
            });
        } else {
            el.dataset.maximized = "";
            el.style.top = "calc(50% + 25px)";
            el.style.left = "50%";
            el.style.transform = "translate(-50%, -50%)";
            gsap.to(el, {
                x: 0, y: 0,
                width: "",
                height: "",
                duration: 0.35,
                ease: "power3.inOut",
                onComplete: () => gsap.set(el, { clearProps: "width,height" }),
            });
        }
    };

    return (
        <div id="window-controls">
            <div className="close" onClick={() => closeWindow(target)} />
            <div className="minimize cursor-pointer" onClick={handleMinimize} />
            <div className="maximize cursor-pointer" onClick={handleMaximize} />
        </div>
    );
};

export default WindowControls;
