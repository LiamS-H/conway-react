import PlayButton from "./playbutton"
import ClearButton from "./clearbutton"
import StepButton from "./stepbutton"

import './nav.css'

export default function Navbar () {

    return (
            <nav>
            <PlayButton/>
            <ClearButton/>
            <StepButton/>
            </nav>
    )
}