import { useLayoutEffect, useRef } from "react";
import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);

        // Draggable: crée une seule fois
        useGSAP(() => {
            const el = ref.current;
            if (!el) return;
            const [instance] = Draggable.create(el, {
                onPress: () => focusWindow(windowKey),
                onDragEnd: function () {
                    const top = el.getBoundingClientRect().top;
                    if (top < 50) {
                        gsap.to(el, {
                            y: "+=" + (50 - top),
                            duration: 0.25,
                            ease: "back.out(1.4)",
                        });
                    }
                },
            });
            return () => instance.kill();
        }, []); // <-- vide : on crée le draggable qu'une seule fois

        // Animation à l'ouverture
        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            // Centrer la fenêtre
            el.style.top = `50%`;
            el.style.left = `50%`;
            el.style.transform = `translate(-50%, -50%)`;

            gsap.fromTo(
                el,
                { scale: 0.8, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            );
        }, [isOpen]); // animation relancée à chaque ouverture

        // Affichage / masquage
        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? "block" : "none";
        }, [isOpen]);

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex }}
                className="absolute bg-white dark:bg-[#1e1e1e] dark:text-gray-100 shadow-lg rounded p-4 w-[600px] max-w-[90vw]"
            >
                <Component {...props} data={windows[windowKey].data} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
};

export default WindowWrapper;