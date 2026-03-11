import React, {useRef} from "react";
import { dockApps, locations } from "#constants/index.js";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";

const MINIMIZED_META = {
    finder:   { icon: "/images/finder.png",   label: "Portfolio" },
    safari:   { icon: "/images/safari.png",   label: "Articles" },
    photos:   { icon: "/images/photos.png",   label: "Galerie" },
    contact:  { icon: "/images/contact.png",  label: "Contact" },
    terminal: { icon: "/images/terminal.png", label: "Skills" },
    resume:   { icon: "/images/finder.png",   label: "CV" },
    txtfile:  { icon: "/images/finder.png",   label: "Texte" },
    imgfile:  { icon: "/images/photos.png",   label: "Image" },
    video:    { icon: "/images/safari.png",   label: "Vidéo" },
    aboutmac: { icon: "/images/logo.svg",     label: "À propos" },
};

const Dock = () => {
    const { openWindow, closeWindow, restoreWindow, windows } = useWindowStore();
    const { setActiveLocation } = useLocationStore();
    const dockRef = useRef(null);

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const getIcons = () => dock.querySelectorAll(".dock-icon");

        const animateIcons = (mouseX) => {
            const { left } = dock.getBoundingClientRect();

            getIcons().forEach((icon) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect();
                const center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance ** 2.5) / 2000);

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power1.out",
                });
            });
        };

        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect();
            animateIcons(e.clientX - left);
        };

        const resetIcons = () => {
            getIcons().forEach((icon) =>
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power1.out",
                })
            );
        };

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        };
    }, []);

    const toggleApp = (app) => {
        if (!app.canOpen) return;

        if (app.id === "trash") {
            setActiveLocation(locations.trash);
            openWindow("finder");
            return;
        }

        const win = windows[app.id];
        if (win.isOpen) {
            closeWindow(app.id);
        } else {
            openWindow(app.id);
        }
    };

    const minimizedWindows = Object.entries(windows).filter(([, win]) => win.isMinimized);

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className="relative flex justify-center">
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}
                        >
                            <img
                                src={`/images/${icon}`}
                                alt={name}
                                loading="lazy"
                                className={canOpen ? "" : "opacity-50"}
                            />
                        </button>
                    </div>
                ))}

                {minimizedWindows.length > 0 && (
                    <>
                        {/* Séparateur macOS */}
                        <div className="w-px h-10 bg-white/30 mx-1 self-center shrink-0" />

                        {minimizedWindows.map(([key]) => {
                            const meta = MINIMIZED_META[key] || { icon: "/images/finder.png", label: key };
                            return (
                                <div key={key} className="relative flex justify-center">
                                    <button
                                        type="button"
                                        className="dock-icon opacity-75"
                                        data-tooltip-id="dock-tooltip"
                                        data-tooltip-content={meta.label}
                                        data-tooltip-delay-show={150}
                                        onClick={() => restoreWindow(key)}
                                    >
                                        <img
                                            src={meta.icon}
                                            alt={meta.label}
                                            loading="lazy"
                                            className="grayscale-[20%]"
                                        />
                                    </button>
                                </div>
                            );
                        })}
                    </>
                )}

                <Tooltip id="dock-tooltip" placement="top" className="tooltip" />
            </div>
        </section>
    );
};

export default Dock;
