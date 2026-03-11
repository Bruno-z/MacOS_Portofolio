import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { playStartup } from "#utils/sounds.js";

dayjs.locale("fr");

const LockScreen = ({ onUnlock }) => {
    const [now, setNow] = useState(dayjs());
    const ref = useRef(null);

    useEffect(() => {
        const id = setInterval(() => setNow(dayjs()), 1000);
        return () => clearInterval(id);
    }, []);

    const handleUnlock = () => {
        playStartup();
        gsap.to(ref.current, {
            y: "-100%",
            duration: 0.7,
            ease: "power3.inOut",
            onComplete: onUnlock,
        });
    };

    return (
        <div
            ref={ref}
            onClick={handleUnlock}
            className="fixed inset-0 flex flex-col items-center justify-center select-none cursor-pointer"
            style={{
                zIndex: 99999,
                backgroundImage: "url('/images/test.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

            <div className="relative z-10 flex flex-col items-center gap-4 text-white">
                {/* Photo profil */}
                <img
                    src="/icons/bruno.png"
                    alt="Bruno Zilio"
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-white/30 shadow-2xl mb-2"
                />

                {/* Heure */}
                <p className="text-8xl font-thin tracking-tight drop-shadow-lg">
                    {now.format("HH:mm")}
                </p>

                {/* Date */}
                <p className="text-xl font-light capitalize tracking-wide text-white/90">
                    {now.format("dddd D MMMM")}
                </p>

                {/* Nom + rôle */}
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold">Bruno Zilio</p>
                    <p className="text-sm text-white/70">Développeur Full-Stack</p>
                </div>
            </div>

            {/* Hint bas de page */}
            <p className="absolute bottom-10 text-white/50 text-sm tracking-widest animate-pulse">
                Cliquer pour déverrouiller
            </p>
        </div>
    );
};

export default LockScreen;
