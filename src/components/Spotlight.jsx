import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import useSpotlightStore from "#store/spotlight.js";
import useWindowStore from "#store/window.js";
import { techStack, dockApps, locations, blogPosts, socials } from "#constants";

// Build the search index once
const buildIndex = () => {
    const entries = [];

    // Applications (from dock)
    dockApps
        .filter((a) => a.canOpen)
        .forEach((app) => {
            entries.push({
                id: `app-${app.id}`,
                category: "Applications",
                label: app.name,
                subtitle: "Ouvrir l'application",
                icon: `/icons/dock/${app.icon}`,
                windowKey: app.id,
            });
        });

    // CV
    entries.push({
        id: "app-resume",
        category: "Applications",
        label: "CV",
        subtitle: "Voir mon curriculum vitae",
        icon: "/icons/dock/finder.png",
        windowKey: "resume",
    });

    // Blog posts / projects
    blogPosts.forEach((post) => {
        entries.push({
            id: `post-${post.id}`,
            category: "Articles & Projets",
            label: post.title,
            subtitle: post.date,
            icon: "/icons/dock/safari.png",
            windowKey: "safari",
        });
    });

    // Socials
    socials.forEach((s) => {
        entries.push({
            id: `social-${s.id}`,
            category: "Contact",
            label: s.text,
            subtitle: s.link,
            icon: s.icon,
            url: s.link,
        });
    });

    // Skills from techStack
    techStack.forEach(({ category, items }) => {
        items.forEach((item) => {
            entries.push({
                id: `skill-${item}`,
                category: "Compétences",
                label: item,
                subtitle: category,
                icon: "/icons/dock/terminal.png",
                windowKey: "terminal",
            });
        });
    });

    // Projects from locations.work.children (folders only)
    const addProjects = (children = []) => {
        children.forEach((item) => {
            if (item.kind === "folder") {
                entries.push({
                    id: `project-${item.id}`,
                    category: "Projets",
                    label: item.name,
                    subtitle: "Ouvrir dans Finder",
                    icon: item.icon || "/icons/dock/finder.png",
                    windowKey: "finder",
                });
                addProjects(item.children);
            }
        });
    };
    addProjects(locations.work.children);

    return entries;
};

const INDEX = buildIndex();

const Spotlight = () => {
    const { isOpen, query, close, setQuery } = useSpotlightStore();
    const { openWindow } = useWindowStore();
    const inputRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    // Keyboard shortcuts (open/close)
    useEffect(() => {
        const handler = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.code === "Space") {
                e.preventDefault();
                useSpotlightStore.getState().isOpen
                    ? close()
                    : useSpotlightStore.getState().open();
            }
            if (e.code === "Escape") close();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [close]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            setSelectedIndex(-1);
        }
    }, [isOpen]);

    // Reset selection when query changes
    useEffect(() => {
        setSelectedIndex(-1);
    }, [query]);

    if (!isOpen) return null;

    const q = query.toLowerCase().trim();
    const filtered = q
        ? INDEX.filter(
              (e) =>
                  e.label.toLowerCase().includes(q) ||
                  e.subtitle.toLowerCase().includes(q)
          )
        : INDEX.slice(0, 8);

    // Group by category
    const groups = filtered.reduce((acc, entry) => {
        (acc[entry.category] = acc[entry.category] || []).push(entry);
        return acc;
    }, {});

    const handleSelect = (entry) => {
        close();
        if (entry.url) {
            window.open(entry.url, "_blank", "noopener,noreferrer");
        } else {
            openWindow(entry.windowKey);
        }
    };

    const handleKeyDown = (e) => {
        if (filtered.length === 0) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter" && selectedIndex >= 0) {
            e.preventDefault();
            handleSelect(filtered[selectedIndex]);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[9998] flex flex-col items-center pt-32 bg-black/40 backdrop-blur-xs"
            onClick={close}
        >
            <div
                className="w-[620px] max-w-[90vw] rounded-2xl shadow-2xl overflow-hidden bg-white/80 dark:bg-[#2a2a2a]/90 backdrop-blur-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search bar */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                    <Search className="text-gray-400 shrink-0" size={20} />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Rechercher…"
                        className="flex-1 bg-transparent text-gray-800 dark:text-gray-100 text-lg outline-none placeholder:text-gray-400"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Results */}
                {Object.keys(groups).length > 0 ? (
                    <div className="max-h-[400px] overflow-y-auto py-2">
                        {Object.entries(groups).map(([category, entries]) => (
                            <div key={category}>
                                <p className="px-5 py-1 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                    {category}
                                </p>
                                {entries.map((entry) => {
                                    const flatIndex = filtered.indexOf(entry);
                                    const isSelected = flatIndex === selectedIndex;
                                    return (
                                        <button
                                            key={entry.id}
                                            onClick={() => handleSelect(entry)}
                                            className={`w-full flex items-center gap-3 px-5 py-2.5 transition-colors cursor-pointer group ${
                                                isSelected
                                                    ? "bg-blue-500 text-white"
                                                    : "hover:bg-blue-500 hover:text-white"
                                            }`}
                                        >
                                            <img
                                                src={entry.icon}
                                                alt=""
                                                className="w-7 h-7 object-contain rounded"
                                                onError={(e) => { e.target.style.display = "none"; }}
                                            />
                                            <div className="text-left">
                                                <p className={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-800 dark:text-gray-100 group-hover:text-white"}`}>
                                                    {entry.label}
                                                </p>
                                                <p className={`text-xs truncate max-w-[480px] ${isSelected ? "text-blue-100" : "text-gray-400 group-hover:text-blue-100"}`}>
                                                    {entry.subtitle}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="px-5 py-6 text-sm text-gray-400 text-center">
                        Aucun résultat pour « {query} »
                    </p>
                )}
            </div>
        </div>
    );
};

export default Spotlight;
