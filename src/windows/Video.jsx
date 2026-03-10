import { useRef } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";

const Video = ({ data }) => {
    const videoRef = useRef(null);

    // Sécurité si data est absent
    if (!data) {
        return (
            <div className="p-4">
                <p className="text-sm text-gray-500">Pas de vidéo disponible</p>
            </div>
        );
    }

    // On force toujours description à être un tableau
    const description = Array.isArray(data.description)
        ? data.description
        : data.description
            ? [data.description]
            : [];

    return (
        <div className="p-4">
            {/* Header macOS */}
            <div id="window-header" className="mb-2">
                <WindowControls target="video" />
            </div>

            {/* Vidéo */}
            {data.videoUrl && (
                <video
                    ref={videoRef}
                    src={data.videoUrl}
                    poster={data.icon}
                    controls
                    className="w-full h-auto rounded-lg shadow-md"
                />
            )}

            {/* Description */}
            {description.length > 0 && (
                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                    {description.map((line, i) => (
                        <li key={i}>• {line}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const VideoWindow = WindowWrapper(Video, "video");
export default VideoWindow;
