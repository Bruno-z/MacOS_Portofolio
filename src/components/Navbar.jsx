import dayjs from "dayjs";
import React from 'react'
import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window.js";
import useThemeStore from "#store/theme.js";

const Navbar = () => {
    const { openWindow } = useWindowStore();
    const { isDark, toggleTheme } = useThemeStore();

    return <nav>
        <div>
            <img src="/images/logo.svg" alt="logo"/>
            <p className="font-bold">Zilio Bruno</p>

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
                    <li key={id}>
                        <img src={img} className="icon-hover" alt={`icon-${id}`}/>
                    </li>
                ))}
            </ul>

            <button
                onClick={toggleTheme}
                title={isDark ? "Mode clair" : "Mode sombre"}
                className="cursor-pointer p-1 rounded hover:bg-white/20 transition-colors"
            >
                <img src="/icons/mode.svg" alt="toggle dark mode" className="w-5 h-5"/>
            </button>

            <time>{dayjs().format('ddd MMM D h:mm A')}</time>
        </div>
    </nav>
}
export default Navbar
