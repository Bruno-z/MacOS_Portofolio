import { useEffect, useRef } from "react";
import gsap from "gsap";

const BootScreen = ({ onDone }) => {
    const containerRef = useRef(null);
    const barRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Progress bar fills over 2.2s
        tl.to(barRef.current, {
            width: "100%",
            duration: 2.2,
            ease: "power1.inOut",
        })
        // Short pause, then fade out
        .to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                localStorage.setItem("hasBooted", "true");
                onDone();
            },
        }, "+=0.1");
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-black z-[999999] flex flex-col items-center justify-center gap-16"
        >
            <img
                src="/images/logo.svg"
                alt="Apple"
                style={{ filter: "invert(1)", width: "64px" }}
            />
            <div className="w-48 h-[3px] bg-gray-700 rounded-full overflow-hidden">
                <div
                    ref={barRef}
                    className="h-full bg-white rounded-full"
                    style={{ width: 0 }}
                />
            </div>
        </div>
    );
};

export default BootScreen;
