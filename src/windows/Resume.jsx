import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {WindowControls} from "#components/index.js";
import {Download} from "lucide-react";
import {  Document,Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();


const Resume = ({ title }) => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="resume" />
                <h2>{title}</h2>  {/* Utilisation de la prop */}
                <a
                    href="/files/resume.pdf"
                    download
                    className="cursor-pointer"
                    title="Download Resume"
                >
                    <Download className="icon" />
                </a>
            </div>

            <Document file="/files/resume.pdf">
                <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
            </Document>
        </>
    );
};

const ResumeWindow = WindowWrapper(Resume, 'resume', { title: 'Mon CV' });
export default ResumeWindow;