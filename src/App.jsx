import {Navbar, Welcome, Dock} from "#components"
import  { Draggable} from "gsap/Draggable";
import {Terminal} from "#windows/index.js";
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
           </main>
        </div>
    )
}
export default App
