import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls.jsx";

const stats = [
    { label: "Expérience",   value: "3+ ans en entreprise" },
    { label: "Clients",      value: "Airbus · Orange · ARSEAA" },
    { label: "Stack",        value: "React · TypeScript · Angular · Spring Boot" },
    { label: "Localisation", value: "France" },
];

const AboutMac = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="aboutmac" />
            </div>

            <div className="flex flex-col items-center text-center px-8 pt-6 pb-8 w-[380px]">
                <img
                    src="/icons/bruno.png"
                    alt="Bruno Zilio"
                    className="w-24 h-24 rounded-full object-cover mb-4 ring-2 ring-gray-200 dark:ring-gray-600"
                />

                <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">Bruno Zilio</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Développeur Full-Stack</p>

                <div className="flex justify-center w-full border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="grid grid-cols-[110px_1fr] gap-x-6 gap-y-3 text-sm">
                        {stats.map(({ label, value }) => (
                            <React.Fragment key={label}>
                                <span className="text-right text-gray-400 dark:text-gray-500">{label}</span>
                                <span className="font-medium text-gray-700 dark:text-gray-200">{value}</span>
                            </React.Fragment>
                        ))}
                        <span className="text-right text-gray-400 dark:text-gray-500">Disponibilité</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">En recherche active</span>
                    </div>
                </div>

                <p className="text-xs text-gray-300 dark:text-gray-600 mt-6">Portfolio 2026</p>
            </div>
        </>
    );
};

const AboutMacWindow = WindowWrapper(AboutMac, "aboutmac");
export default AboutMacWindow;
