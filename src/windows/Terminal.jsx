import React from 'react'
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {techStack} from "#constants/index.js";
import { Check } from "lucide-react";
import WindowControls from "#components/WindowControls.jsx";

const Terminal = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls  target ='terminal'/>
                <h2>Tech Stack</h2>
            </div>

            <div className="techstack">
                <p>
                    <span className="font-bold"> @Zilio % </span>
                    show tech stack
                </p>

                <div className="label">
                    <p className="w-32">Category</p>
                    <p> Technologies </p>
                </div>

                <ul className="content">
                    {techStack.map(({category, items}) => (
                        <li key = {category} className="flex items-center ">
                            <Check className="check" size = {20} />
                            <h3>{category}</h3>
                            <ul>
                                {items.map((item, i ) => (
                                    <li key={i}>
                                        {item}
                                        {i < items.length - 1  ? "," : ""}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const TerminalWindows = WindowWrapper(Terminal, 'terminal');

export default TerminalWindows
