import {Navbar, Welcome, Dock, Home} from "#components"
import  { Draggable} from "gsap/Draggable";
import {Safari, Terminal, Resume, Finder, Text,ImageWindowContent, Contact, Gallery, Video} from "#windows/index.js";
import gsap from "gsap";


gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <div>
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
           </main>
        </div>
    )
}
export default App
