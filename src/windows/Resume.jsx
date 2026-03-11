import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import { Download } from "lucide-react";

const Resume = ({ title }) => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="resume" />
                <h2>Mon CV</h2>
                <a
                    href="/files/resume.pdf"
                    download
                    className="cursor-pointer"
                    title="Télécharger le CV"
                >
                    <Download className="icon" />
                </a>
            </div>

            <iframe
                src="/cv_final.html"
                title="CV Bruno Zilio"
                className="-mx-4 -mb-4"
                style={{ width: "calc(100% + 2rem)", height: "80vh", border: "none", display: "block" }}
            />
        </>
    );
};

const ResumeWindow = WindowWrapper(Resume, "resume", { title: "Mon CV" });
export default ResumeWindow;