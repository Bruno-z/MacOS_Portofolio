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
