import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import useMCStore from "#store/missioncontrol.js";
import useWindowStore from "#store/window.js";

const MC_SCALE = 0.45;
const NAVBAR_H = 50;
const DOCK_H = 110;

const MissionControl = () => {
    const { isActive, savedPositions, exit } = useMCStore();
    const { windows, focusWindow } = useWindowStore();
    const [hotspots, setHotspots] = useState([]);
    // Local ref so exit animation can access positions even after store clears them
    const savedRef = useRef({});

    // Animate IN when isActive becomes true
    useEffect(() => {
        const openKeys = Object.entries(windows)
            .filter(([, w]) => w.isOpen && !w.isMinimized)
            .map(([key]) => key);

        if (!isActive || openKeys.length === 0) return;

        // Snapshot positions to ref before any state can change
        savedRef.current = { ...savedPositions };

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const areaTop = NAVBAR_H;
        const areaBottom = vh - DOCK_H;
        const areaH = areaBottom - areaTop;

        const N = openKeys.length;
        const cols = N <= 2 ? N : Math.ceil(Math.sqrt(N));
        const rows = Math.ceil(N / cols);
        const cellW = vw / cols;
        const cellH = areaH / rows;

        const newHotspots = [];

        openKeys.forEach((key, i) => {
            const el = document.getElementById(key);
            if (!el) return;

            const col = i % cols;
            const row = Math.floor(i / cols);

            const cx = col * cellW + cellW / 2;
            const cy = areaTop + row * cellH + cellH / 2;

            const gsapX = cx - vw / 2;
            const gsapY = cy - vh / 2;

            // Disable drag interactions during MC
            el.style.pointerEvents = "none";

            gsap.to(el, {
                x: gsapX,
                y: gsapY,
                scale: MC_SCALE,
                duration: 0.5,
                ease: "power3.inOut",
            });

            // Compute hotspot bounds
            const scaledW = el.offsetWidth * MC_SCALE;
            const scaledH = el.offsetHeight * MC_SCALE;

            newHotspots.push({
                key,
                left: vw / 2 + gsapX - scaledW / 2,
                top: vh / 2 + gsapY - scaledH / 2,
                width: scaledW,
                height: scaledH,
            });
        });

        setHotspots(newHotspots);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    // Animate OUT when isActive becomes false
    useEffect(() => {
        if (isActive) return;

        setHotspots([]);

        // Use ref snapshot — store's savedPositions is already {} by this point
        Object.entries(savedRef.current).forEach(([key, pos]) => {
            const el = document.getElementById(key);
            if (!el) return;

            // Restore pointer-events immediately so windows are interactive right away
            el.style.pointerEvents = "";

            gsap.to(el, {
                x: pos.x,
                y: pos.y,
                scale: 1,
                duration: 0.4,
                ease: "power3.inOut",
            });
        });

        savedRef.current = {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    // Escape key to exit
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape" && isActive) exit();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isActive, exit]);

    if (!isActive) return null;

    return (
        <>
            {/* Dark overlay — clicking it exits MC */}
            <div
                className="fixed inset-0 z-[9980] bg-black/40 backdrop-blur-sm"
                onClick={exit}
            />

            {/* Clickable hotspots over each window thumbnail */}
            {hotspots.map(({ key, left, top, width, height }) => (
                <div
                    key={key}
                    className="fixed z-[9990] cursor-pointer rounded-xl ring-2 ring-transparent hover:ring-white/60 transition-all duration-150"
                    style={{ left, top, width, height }}
                    onClick={(e) => {
                        e.stopPropagation();
                        exit();
                        focusWindow(key);
                    }}
                />
            ))}
        </>
    );
};

export default MissionControl;
