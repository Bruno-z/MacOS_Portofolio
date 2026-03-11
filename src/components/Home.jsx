import { locations } from "#constants/index.js";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import clsx from "clsx";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";
import useMCStore from "#store/missioncontrol.js";

const proWorkFolder = locations.work.children.find(
    (item) => item.name === "Mon travail professionnel"
);

const projects = proWorkFolder?.children ?? [];

const Home = () => {

    const { setActiveLocation} = useLocationStore();
    const { openWindow, windows } = useWindowStore();
    const { enter } = useMCStore();
    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project);
        openWindow("finder");
    };
    useGSAP(() => {
        Draggable.create(".folder", {

        });
    }, []);

    const handleDesktopClick = (e) => {
        if (e.target !== e.currentTarget) return;

        const x = e.clientX;
        const y = e.clientY;

        [0, 0.1, 0.22].forEach((delay) => {
            const ripple = document.createElement("div");
            Object.assign(ripple.style, {
                position: "fixed",
                left: `${x}px`,
                top: `${y}px`,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: "1.5px solid rgba(255, 255, 255, 0.45)",
                transform: "translate(-50%, -50%) scale(0)",
                pointerEvents: "none",
                zIndex: "1",
            });
            document.body.appendChild(ripple);

            gsap.to(ripple, {
                scale: 15,
                opacity: 0,
                duration: 0.9,
                delay,
                ease: "power2.out",
                onComplete: () => ripple.remove(),
            });
        });
    };

    const handleMissionControl = (e) => {
        if (e.target !== e.currentTarget) return;

        const openKeys = Object.entries(windows)
            .filter(([, w]) => w.isOpen && !w.isMinimized)
            .map(([key]) => key);
        if (openKeys.length === 0) return;

        const saved = {};
        openKeys.forEach((key) => {
            const el = document.getElementById(key);
            if (el) saved[key] = { x: gsap.getProperty(el, "x"), y: gsap.getProperty(el, "y") };
        });
        enter(saved);
    };

    return (
        <section id="home" className="relative w-full h-full" onClick={handleDesktopClick} onDoubleClick={handleMissionControl}>
            <ul>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className={clsx(
                            "folder absolute flex flex-col items-center gap-1 cursor-pointer select-none",
                            project.position
                        )}
                        onClick={() => handleOpenProjectFinder(project)}
                    >
                        <img
                            src={project.icon}
                            alt={project.name}
                            className="w-14"
                        />
                        <p className="text-xs font-medium text-center">
                            {project.name}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Home;
