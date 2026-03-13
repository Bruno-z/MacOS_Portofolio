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
    <svg
        viewBox="0 0 60 20"
        style={{
            position: "absolute",
            top,
            width: 36,
            height: 14,
            animation: `flyLeft ${duration} linear ${delay} infinite`,
            opacity: 0,
        }}
        fill="none"
        stroke="rgba(30,30,30,0.55)"
        strokeWidth="2"
        strokeLinecap="round"
    >
        <path d="M0 10 Q15 0 30 10 Q45 0 60 10" />
    </svg>
);

const Star = ({ top, left, delay, size }) => (
    <div
        style={{
            position: "absolute",
            top,
            left,
            width: size,
            height: size,
            borderRadius: "50%",
            background: "white",
            animation: `twinkle ${3 + Math.random() * 2}s ease-in-out ${delay} infinite`,
        }}
    />
);

const AnimatedBackground = () => {
    const { isDark } = useThemeStore();

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Les deux images partagent le même conteneur animé — pas de décalage possible */}
            <div className="absolute inset-0 ken-burns">
                <img
                    src="/images/test.jpg"
                    alt=""
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isDark ? "opacity-0" : "opacity-100"}`}
                />
                <img
                    src="/images/portfolio_night_download.png"
                    alt=""
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isDark ? "opacity-100" : "opacity-0"}`}
                />
            </div>

            {/* Birds — day only */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                style={{ opacity: isDark ? 0 : 1 }}
            >
                {BIRDS.map((b, i) => <Bird key={i} {...b} />)}
            </div>

            {/* Stars — night only */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                style={{ opacity: isDark ? 1 : 0 }}
            >
                {STARS.map((s, i) => <Star key={i} {...s} />)}
            </div>
        </div>
    );
};

export default AnimatedBackground;
