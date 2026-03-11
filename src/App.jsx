import {Navbar, Welcome, Dock, Home, LockScreen, Spotlight, MobileOverlay} from "#components"
import MissionControl from "#components/MissionControl.jsx";
import CursorTrail from "#components/CursorTrail.jsx";
import PortfolioEasterEgg from "#components/PortfolioEasterEgg.jsx";
import { useState } from "react"
import  { Draggable} from "gsap/Draggable";
import {Safari, Terminal, Resume, Finder, Text,ImageWindowContent, Contact, Gallery, Video, AboutMac} from "#windows/index.js";
import gsap from "gsap";


gsap.registerPlugin(Draggable);

const App = () => {
    const [isLocked, setIsLocked] = useState(true);

    return (
        <div>
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
           </main>
        </div>
    )
}
export default App
