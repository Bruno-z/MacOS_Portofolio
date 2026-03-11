import React from 'react'
import Window from "#store/window.js";
import {WindowControls} from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {
    ChevronRight,
    PanelLeft,
    Search,
    Share,
    Plus,
    Copy,
    ChevronLeft,
    SearchIcon,
    ShieldHalf,
    MoveRight
} from "lucide-react";
import {blogPosts} from "#constants/index.js";


export const Safari = () => {
    return (
    <>
        <div id="window-header">
            <WindowControls target="safari"/>

            <PanelLeft className="ml-10 icon"></PanelLeft>

            <div className="flex items-center gap-1 ml-5">
                <ChevronLeft className="icon"/>
                <ChevronRight className="icon"/>
            </div>

            <div className="search flex items-center w-full">
                <Search className="icon"/>

                <input
                    type="text"
                    placeholder="Search or enter website name"
                    className="flex-1 outline-none bg-transparent"
                />
            </div>

            <div className="flex items-center gap-5 ">
                <Share className="icon"/>
                <Plus className="icon"/>
                <Copy className="icon"/>
            </div>
        </div>

        <div className="blog">
            <h2>Aperçu de mes précédents projets</h2>

            <div className="space-y-8">
                {blogPosts.map(({
                                    id, image, title, date, link
                                }) => (
                    <div key={id} className="blog-post">
                            <div className="col-span-2">
                                <img src={image} alt={title} />
                            </div>
                            <div className="content">
                                <p>{date}</p>
                                <h3>{title}</h3>
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                   Ça se passe ici ! <MoveRight className="icon"/>
                                </a>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    </>
    );
};

const SafariWindow = WindowWrapper(Safari, "safari");



export default SafariWindow;