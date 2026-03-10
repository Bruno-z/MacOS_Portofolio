import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";

const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    // Formats: youtube.com/watch?v=ID ou youtu.be/ID
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const isYouTubeUrl = (url) => url && url.includes("youtu");

const Video = ({ data }) => {
    if (!data) {
        return (
            <div className="p-4">
                <p className="text-sm text-gray-500">Pas de vidéo disponible</p>
            </div>
        );
    }

    const embedUrl = isYouTubeUrl(data.videoUrl)
        ? getYouTubeEmbedUrl(data.videoUrl)
        : null;

    return (
        <div className="p-4">
            <div id="window-header" className="mb-2">
                <WindowControls target="video" />
            </div>

            {data.videoUrl && (
                embedUrl ? (
                    <iframe
                        src={embedUrl}
                        className="w-full aspect-video rounded-lg shadow-md"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                ) : (
                    <video
                        src={data.videoUrl}
                        poster={data.icon}
                        controls
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                )
            )}
        </div>
    );
};

const VideoWindow = WindowWrapper(Video, "video");
export default VideoWindow;
