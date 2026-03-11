import dayjs from "dayjs";
import React from 'react'
import { navIcons, navLinks, locations } from "#constants";
import useWindowStore from "#store/window.js";
import useThemeStore from "#store/theme.js";
import useSpotlightStore from "#store/spotlight.js";
import useSoundStore from "#store/sound.js";
import { Volume2, VolumeX } from "lucide-react";

const Navbar = () => {
    const { openWindow } = useWindowStore();
    const { isDark, toggleTheme } = useThemeStore();
    const { open: openSpotlight } = useSpotlightStore();
    const { isMuted, toggleMute } = useSoundStore();

    return <nav>
        <div>
            <img src="/images/logo.svg" alt="logo" className="cursor-pointer" onClick={() => openWindow("aboutmac")}/>
            <p className="font-bold cursor-pointer" onClick={() => openWindow("txtfile", locations.about.children[0])}>Zilio Bruno</p>

            <ul>
                {navLinks.map(({ id, name, type }) => (
                    <li key={id} onClick={() => openWindow(type)}>
                        <p>{name}</p>
                    </li>
                ))}
            </ul>
        </div>

        <div>
            <ul>
                {navIcons.map(({ id, img }) => (
                    <li key={id}
                        onClick={id === 2 ? openSpotlight : id === 3 ? () => openWindow("aboutmac") : undefined}
                        className={id === 2 || id === 3 ? "cursor-pointer" : ""}>
                        <img src={img} className="icon-hover" alt={`icon-${id}`}/>
                    </li>
                ))}
            </ul>

            <span
                onClick={toggleMute}
                title={isMuted ? "Activer le son" : "Couper le son"}
                className="icon cursor-pointer flex items-center"
            >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </span>

            <img
                src="/icons/mode.svg"
                alt="toggle dark mode"
                title={isDark ? "Mode clair" : "Mode sombre"}
                onClick={toggleTheme}
                className="icon-hover cursor-pointer"
            />

            <time>{dayjs().format('ddd MMM D h:mm A')}</time>
        </div>
    </nav>
}
export default Navbar
