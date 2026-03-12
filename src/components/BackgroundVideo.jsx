import useThemeStore from "#store/theme.js";

const BIRDS = [
    { delay: "0s",  top: "11%", duration: "22s" },
    { delay: "8s",  top: "17%", duration: "28s" },
    { delay: "15s", top: "7%",  duration: "20s" },
];

const STARS = [
    { top: "7%",  left: "12%", delay: "0s",   size: 2   },
    { top: "14%", left: "66%", delay: "0.8s",  size: 1.5 },
    { top: "5%",  left: "38%", delay: "1.4s",  size: 2   },
    { top: "20%", left: "82%", delay: "0.3s",  size: 1.5 },
    { top: "9%",  left: "28%", delay: "2.1s",  size: 1   },
    { top: "17%", left: "54%", delay: "1.7s",  size: 2   },
    { top: "4%",  left: "74%", delay: "0.9s",  size: 1.5 },
    { top: "23%", left: "19%", delay: "1.2s",  size: 1   },
    { top: "12%", left: "90%", delay: "2.5s",  size: 2   },
    { top: "8%",  left: "47%", delay: "0.5s",  size: 1   },
];

const Bird = ({ delay, top, duration }) => (
    <div
        className="absolute pointer-events-none"
        style={{ top, animation: `flyLeft ${duration} linear ${delay} infinite`, opacity: 0 }}
    >
        <svg viewBox="0 0 40 16" width="28" height="11">
            <path
                d="M0,8 Q10,0 20,8 Q30,0 40,8"
                stroke="rgba(20,20,20,0.45)"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
            />
        </svg>
    </div>
);

const Star = ({ top, left, delay, size }) => (
    <div
        className="absolute rounded-full bg-white pointer-events-none"
        style={{
            top, left,
            width: size,
            height: size,
            animation: `twinkle 3.5s ease-in-out ${delay} infinite`,
        }}
    />
);

const BackgroundVideo = () => {
    const { isDark } = useThemeStore();

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Day image — Ken Burns */}
            <img
                src="/images/test.jpg"
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ken-burns ${isDark ? "opacity-0" : "opacity-100"}`}
            />

            {/* Night image — Ken Burns alt */}
            <img
                src="/images/portfolio_night_download.png"
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ken-burns-alt ${isDark ? "opacity-100" : "opacity-0"}`}
            />

            {/* Overlay jour : oiseaux */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isDark ? "opacity-0" : "opacity-100"}`}>
                {BIRDS.map((b, i) => <Bird key={i} {...b} />)}
            </div>

            {/* Overlay nuit : étoiles */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isDark ? "opacity-100" : "opacity-0"}`}>
                {STARS.map((s, i) => <Star key={i} {...s} />)}
            </div>
        </div>
    );
};

export default BackgroundVideo;
