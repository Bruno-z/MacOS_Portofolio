import { WindowControls } from "#components/index.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Text = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile?.data;

    if (!data) return null;

    const { name, image, subtitle, description } = data;

    return (
        <>
            {/* HEADER */}
            <div id="window-header" className="flex items-center justify-between p-2">
                <WindowControls target="txtfile" />
                <h2 className="text-lg font-semibold truncate">{name}</h2>
            </div>

            {/* CONTENT */}
            <div className="p-5 bg-white dark:bg-[#161b22] h-full overflow-auto space-y-4">
                {/* IMAGE */}
                {image && (
                    <div className="w-full rounded-lg overflow-hidden shadow-md">
                        <img src={image} alt={name} className="w-full h-auto" />
                    </div>
                )}

                {/* SUBTITLE */}
                {subtitle && (
                    <h3 className="text-base font-semibold text-indigo-500 dark:text-green-400 tracking-wide uppercase text-xs border-b border-indigo-200 dark:border-green-900 pb-2">
                        {subtitle}
                    </h3>
                )}

                {/* DESCRIPTION */}
                {description && (
                    <div className="markdown text-gray-800 dark:text-gray-300 text-sm leading-relaxed">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ node, ...props }) => (
                                    <h1 className="text-xl font-bold mt-6 mb-3 text-indigo-700 dark:text-green-300 border-b border-indigo-100 dark:border-green-900 pb-2" {...props} />
                                ),
                                h2: ({ node, ...props }) => (
                                    <h2 className="text-base font-bold mt-5 mb-2 text-indigo-600 dark:text-green-400 pl-3 border-l-2 border-indigo-300 dark:border-green-500" {...props} />
                                ),
                                h3: ({ node, ...props }) => (
                                    <h3 className="text-sm font-semibold mt-4 mb-1 text-indigo-500 dark:text-green-500" {...props} />
                                ),
                                hr: ({ node, ...props }) => (
                                    <hr className="my-5 border-indigo-100 dark:border-green-900/50" {...props} />
                                ),
                                p: ({ node, ...props }) => (
                                    <p className="mb-3 leading-relaxed" {...props} />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul className="mb-3 space-y-1" {...props} />
                                ),
                                li: ({ node, ...props }) => (
                                    <li className="ml-5 list-disc marker:text-indigo-400 dark:marker:text-green-500" {...props} />
                                ),
                                strong: ({ node, ...props }) => (
                                    <strong className="font-semibold text-indigo-700 dark:text-green-400" {...props} />
                                ),
                                code: ({ node, ...props }) => (
                                    <code className="px-1.5 py-0.5 rounded text-xs bg-indigo-50 text-indigo-700 dark:bg-green-900/20 dark:text-green-300 font-mono" {...props} />
                                ),
                            }}
                        >
                            {description}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </>
    );
};

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;
