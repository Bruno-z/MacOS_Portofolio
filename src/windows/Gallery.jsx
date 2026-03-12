import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { photosLinks, gallery } from "#constants/index.js";
import { WindowControls } from "#components";
import clsx from "clsx";

const Gallery = () => {
    const [activeFolder, setActiveFolder] = useState(photosLinks[0]);
    const [lightboxSrc, setLightboxSrc]   = useState(null);
    const [hoveredId,   setHoveredId]     = useState(null);

    const filteredGallery =
        activeFolder.id === 1
            ? gallery
            : gallery.filter(item => item.folderId === activeFolder.id);

    // Fermer la lightbox avec Échap
    useEffect(() => {
        if (!lightboxSrc) return;
        const onKey = (e) => { if (e.key === "Escape") setLightboxSrc(null); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [lightboxSrc]);

    const handleClick = (photo) => {
        if (photo.folderId === 4) setLightboxSrc(photo.img);
        if (photo.folderId === 2 && photo.link) window.open(photo.link, "_blank", "noopener,noreferrer");
    };

    const renderItem = (photo) => {
        // ── Dessins ──────────────────────────────────────────────────────
        if (photo.folderId === 4) {
            return (
                <div
                    key={photo.id}
                    className="rounded-md cursor-zoom-in bg-gray-50 dark:bg-gray-800"
                    onClick={() => handleClick(photo)}
                >
                    <img src={photo.img} alt="" className="w-full h-auto object-contain rounded-md" />
                </div>
            );
        }

        // ── Musique ───────────────────────────────────────────────────────
        if (photo.folderId === 2) {
            return (
                <div
                    key={photo.id}
                    className="photo-item mb-3 break-inside-avoid rounded-md overflow-hidden relative group cursor-pointer"
                    onClick={() => handleClick(photo)}
                >
                    <img src={photo.img} alt="" className="w-full h-auto object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-md">
                        <span className="text-white text-4xl drop-shadow-lg">▶</span>
                    </div>
                </div>
            );
        }

        // ── Jeux ──────────────────────────────────────────────────────────
        if (photo.folderId === 3) {
            return (
                <div
                    key={photo.id}
                    className="photo-item mb-3 break-inside-avoid rounded-md overflow-hidden relative"
                    onMouseEnter={() => setHoveredId(photo.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    <img src={photo.img} alt="" className="w-full h-auto object-cover" />
                    {hoveredId === photo.id && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 rounded-md">
                            <a
                                href={photo.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-full transition-colors"
                            >
                                🎮 {photo.linkLabel}
                            </a>
                            <a
                                href={photo.trailer}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-full transition-colors"
                            >
                                ▶ Trailer
                            </a>
                        </div>
                    )}
                </div>
            );
        }

        // ── Fallback ──────────────────────────────────────────────────────
        return (
            <div key={photo.id} className="photo-item mb-3 break-inside-avoid rounded-md overflow-hidden">
                <img src={photo.img} alt="" className="w-full h-auto object-cover" />
            </div>
        );
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="photos" />
            </div>

            <div className="bg-white dark:bg-[#1e1e1e] flex flex-1 overflow-hidden rounded-xl min-h-[min(620px,65vh)]">
                {/* SIDEBAR */}
                <aside className="w-56 border-r dark:border-gray-700 dark:bg-[#2d2d2d] px-3 py-4 shrink-0">
                    <p className="text-sm font-medium text-gray-400 mb-3"></p>
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
                <section className="flex-1 overflow-auto px-6 py-4 min-h-[min(620px,65vh)] dark:bg-[#1e1e1e]">
                    {filteredGallery.length === 0 ? (
                        <p className="text-gray-400 text-center mt-10">Aucune photo disponible</p>
                    ) : activeFolder.id === 4 ? (
                        <div className="flex flex-col gap-3 pr-3">
                            {filteredGallery.map(renderItem)}
                        </div>
                    ) : (
                        <div
                            className="photo-masonry"
                            style={{ columnCount: 2, columnGap: "12px", paddingRight: "12px" }}
                        >
                            {filteredGallery.map(renderItem)}
                        </div>
                    )}
                </section>
            </div>

            {/* LIGHTBOX — Dessins (portal pour échapper au transform GSAP) */}
            {lightboxSrc && createPortal(
                <div
                    className="fixed inset-0 z-[9998] bg-black/85 backdrop-blur-sm flex items-center justify-center"
                    onClick={() => setLightboxSrc(null)}
                >
                    <img
                        src={lightboxSrc}
                        alt="Dessin"
                        className="w-auto h-auto rounded-xl shadow-2xl"
                        style={{ maxWidth: "90vw", maxHeight: "90vh" }}
                        onClick={e => e.stopPropagation()}
                    />
                    <button
                        className="absolute top-4 right-6 text-white text-4xl font-light hover:opacity-70 transition-opacity leading-none"
                        onClick={() => setLightboxSrc(null)}
                    >
                        ✕
                    </button>
                </div>,
                document.body
            )}
        </>
    );
};

const GalleryWindow = WindowWrapper(Gallery, "photos");
export default GalleryWindow;
