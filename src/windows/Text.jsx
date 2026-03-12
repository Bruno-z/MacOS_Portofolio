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
            <div className="p-5 bg-white dark:bg-[#1e1e1e] h-full overflow-auto space-y-6">
                {/* IMAGE */}
                {image && (
                    <div className="w-full">
                        <img src={image} alt={name} className="w-full h-auto rounded" />
                    </div>
                )}

                {/* SUBTITLE */}
                {subtitle && <h3 className="text-lg font-semibold">{subtitle}</h3>}

                {/* DESCRIPTION */}
                {description && (
                    <div className="markdown text-gray-800 dark:text-gray-200">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-3 text-gray-800 dark:text-gray-200" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-base font-semibold mb-2 text-gray-700 dark:text-gray-300" {...props} />,
                                hr: ({ node, ...props }) => <hr className="my-4 border-gray-200 dark:border-gray-600" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                                li: ({ node, ...props }) => <li className="ml-6 mb-2 list-disc" {...props} />,
                                strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props} />,
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
