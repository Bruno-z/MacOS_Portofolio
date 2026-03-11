import { useState } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { photosLinks, gallery } from "#constants/index.js";
import { WindowControls } from "#components";
import clsx from "clsx";

const Gallery = () => {
    const [activeFolder, setActiveFolder] = useState(photosLinks[0]);

    const filteredGallery =
        activeFolder.id === 1
            ? gallery
            : gallery.filter(item => item.folderId === activeFolder.id);

    return (
        <>
            <div id="window-header">
                <WindowControls target="photos" />
            </div>

            {/* WINDOW (taille gérée par WindowStore) */}
            <div className="bg-white dark:bg-[#1e1e1e] flex flex-1 overflow-hidden rounded-xl min-h-[620px]">
                {/* SIDEBAR */}
                <aside className="w-56 border-r dark:border-gray-700 dark:bg-[#2d2d2d] px-3 py-4 shrink-0">
                    <p className="text-sm font-medium text-gray-400 mb-3 "></p>
                    <ul className="space-y-1">
                        {photosLinks.map(link => (
                            <li
                                key={link.id}
                                onClick={() => setActiveFolder(link)}
                                className={clsx(
                                    "flex items-center gap-2 px-3 py-[6px] rounded-md cursor-pointer text-sm transition select-none",
                                    link.id === activeFolder.id
                                        ? "bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                )}
                            >
                                <img
                                    src={link.icon}
                                    className={clsx("w-4", link.id === activeFolder.id && "opacity-90")}
                                    alt={link.title}
                                />
                                {link.title}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* CONTENT */}
                <section className="flex-1 overflow-auto px-6 py-4 min-h-[620px] dark:bg-[#1e1e1e]">
                    {filteredGallery.length === 0 ? (
                        <p className="text-gray-400 text-center mt-10">Aucune photo disponible</p>
                    ) : (
                        <div
                            className="photo-masonry"
                            style={{
                                columnCount: 2,
                                columnGap: "12px",
                                paddingRight: "12px", // pour ne pas couper les photos à droite
                            }}
                        >
                            {filteredGallery.map(photo => (
                                <div
                                    key={photo.id}
                                    className="photo-item mb-3 break-inside-avoid rounded-md overflow-hidden"
                                >
                                    <img
                                        src={photo.img}
                                        alt=""
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

const GalleryWindow = WindowWrapper(Gallery, "photos");
export default GalleryWindow;
