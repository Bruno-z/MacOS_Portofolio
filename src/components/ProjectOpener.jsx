import { useEffect } from 'react';
import { locations } from '#constants/index.js';
import useWindowStore from '#store/window.js';
import useLocationStore from '#store/location.js';

const allProjects = locations.work.children.flatMap((f) => f.children ?? []);

const ProjectOpener = () => {
    const { openWindow } = useWindowStore();
    const { setActiveLocation } = useLocationStore();

    useEffect(() => {
        const handler = ({ data }) => {
            if (data?.type !== 'open-project') return;
            const project = allProjects.find((p) => p.id === data.projectId);
            if (!project) return;
            setActiveLocation(project);
            openWindow('finder');
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, [openWindow, setActiveLocation]);

    return null;
};

export default ProjectOpener;
