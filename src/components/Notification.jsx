import { useState, useEffect } from "react";
import useWindowStore from "#store/window.js";

const Notification = ({ trigger }) => {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { openWindow } = useWindowStore();

    useEffect(() => {
        if (!trigger || mounted) return;
        setMounted(true);

        const showTimer = setTimeout(() => setVisible(true), 2500);
        const hideTimer = setTimeout(() => setVisible(false), 7500);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, [trigger, mounted]);

    if (!mounted) return null;

    return (
        <div
            className={`fixed top-16 right-4 z-[9999] w-80 bg-white/85 dark:bg-[#2a2a2a]/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 flex items-start gap-3 cursor-pointer transition-all duration-500 ease-out ${
                visible ? "translate-x-0 opacity-100" : "translate-x-[110%] opacity-0"
            }`}
            onClick={() => { openWindow("contact"); setVisible(false); }}
        >
            <img
                src="/icons/dock/contact.png"
                alt=""
                className="w-10 h-10 rounded-xl flex-shrink-0"
                onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Bruno Zilio</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Disponible pour de nouveaux projets !
                </p>
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); setVisible(false); }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs leading-none flex-shrink-0 cursor-pointer"
            >
                ✕
            </button>
        </div>
    );
};

export default Notification;
