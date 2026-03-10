import { locations } from "#constants/index.js";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import clsx from "clsx";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";

const proWorkFolder = locations.work.children.find(
    (item) => item.name === "Mon travail professionnel"
);

const projects = proWorkFolder?.children ?? [];

const Home = () => {

    const { setActiveLocation} = useLocationStore();
    const { openWindow } = useWindowStore();
    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project);
        openWindow("finder");
    };
    useGSAP(() => {
        Draggable.create(".folder", {

        });
    }, []);

    return (
        <section id="home" className="relative w-full h-full">
            <ul>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className={clsx(
                            "folder absolute flex flex-col items-center gap-1 cursor-pointer select-none",
                            project.position
                        )}
                        onClick={() => handleOpenProjectFinder(project)}
                    >
                        <img
                            src={project.icon}
                            alt={project.name}
                            className="w-14"
                        />
                        <p className="text-xs font-medium text-center">
                            {project.name}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Home;
