import {Navbar, Welcome, Dock, Home, LockScreen, Spotlight, MobileOverlay} from "#components"
import AnimatedBackground from "#components/AnimatedBackground.jsx";
import BootScreen from "#components/BootScreen.jsx"
import MissionControl from "#components/MissionControl.jsx";
import CursorTrail from "#components/CursorTrail.jsx";
import PortfolioEasterEgg from "#components/PortfolioEasterEgg.jsx";
import ProjectOpener from "#components/ProjectOpener.jsx";
import Screensaver from "#components/Screensaver.jsx";
import DesktopCat from "#components/DesktopCat.jsx";
import Notification from "#components/Notification.jsx";
import DesktopWidgets from "#components/DesktopWidgets.jsx";
import { useState } from "react"
import  { Draggable} from "gsap/Draggable";
import {Safari, Terminal, Resume, Finder, Text,ImageWindowContent, Contact, Gallery, Video, AboutMac} from "#windows/index.js";
import gsap from "gsap";


gsap.registerPlugin(Draggable);

const App = () => {
    const [isLocked, setIsLocked] = useState(true);
    const [hasBooted, setHasBooted] = useState(!!localStorage.getItem("hasBooted"));

    return (
        <div>
           <AnimatedBackground />
           {!hasBooted && <BootScreen onDone={() => setHasBooted(true)} />}
           <MobileOverlay />
           {isLocked && <LockScreen onUnlock={() => setIsLocked(false)} />}
           <main>
               <Navbar/>
               <Welcome/>
               <Dock/>

               <Terminal/>
               <Safari/>
               <Resume/>
               <Finder/>
               <Text/>
               <ImageWindowContent/>
               <Contact/>
               <Gallery/>
               <Home/>
               <Video/>
               <AboutMac/>
               <Spotlight/>
               <MissionControl/>
               <CursorTrail/>
               <PortfolioEasterEgg/>
               <ProjectOpener/>
               <Screensaver/>
               <DesktopCat/>
           </main>
           <Notification trigger={!isLocked} />
           <DesktopWidgets />
        </div>
    )
}
export default App
