import {Navbar, Welcome, Dock} from "#components"
import  { Draggable} from "gsap/Draggable";
import {Safari, Terminal, Resume, Finder, Text,ImageWindowContent, Contact, Gallery} from "#windows/index.js";
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
           </main>
        </div>
    )
}
export default App
