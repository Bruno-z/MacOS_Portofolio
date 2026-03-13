import { useState, useEffect } from "react";

const getWeatherEmoji = (code) => {
    if (!code) return "🌤️";
    if (code === 113) return "☀️";
    if (code <= 119) return "⛅";
    if (code <= 122) return "☁️";
    if (code <= 185) return "🌦️";
    if (code <= 232) return "⛈️";
    if (code <= 260) return "🌫️";
    if (code <= 314) return "🌧️";
    if (code <= 335) return "🌨️";
    return "🌤️";
};

const ClockWidget = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    const dateStr = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

    return (
        <div className="bg-black/20 backdrop-blur-md rounded-2xl px-5 py-4 text-white shadow-lg select-none">
            <p className="text-4xl font-light tracking-tight tabular-nums">{timeStr}</p>
            <p className="text-sm text-white/70 mt-1 capitalize">{dateStr}</p>
        </div>
    );
};

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://wttr.in/?format=j1")
            .then((r) => r.json())
            .then((data) => {
                const cond = data.current_condition[0];
                const area = data.nearest_area[0];
                setWeather({
                    temp: cond.temp_C,
                    desc: cond.weatherDesc[0].value,
                    code: parseInt(cond.weatherCode),
                    city: area.areaName[0].value,
                });
            })
            .catch(() => setWeather(null))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="bg-black/20 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg animate-pulse">
            <div className="h-8 w-20 bg-white/20 rounded-lg" />
            <div className="h-3 w-28 bg-white/15 rounded mt-2" />
            <div className="h-3 w-20 bg-white/10 rounded mt-1" />
        </div>
    );

    if (!weather) return null;

    return (
        <div className="bg-black/20 backdrop-blur-md rounded-2xl px-5 py-4 text-white shadow-lg select-none">
            <div className="flex items-center gap-2">
                <span className="text-3xl leading-none">{getWeatherEmoji(weather.code)}</span>
                <span className="text-3xl font-light">{weather.temp}°C</span>
            </div>
            <p className="text-sm text-white/80 mt-2">{weather.city}</p>
            <p className="text-xs text-white/50 mt-0.5 truncate max-w-[160px]">{weather.desc}</p>
        </div>
    );
};

const DesktopWidgets = () => (
    <div className="fixed top-16 right-4 z-[1] flex flex-col gap-3 max-sm:hidden pointer-events-none">
        <div className="pointer-events-auto"><ClockWidget /></div>
        <div className="pointer-events-auto"><WeatherWidget /></div>
    </div>
);

export default DesktopWidgets;
