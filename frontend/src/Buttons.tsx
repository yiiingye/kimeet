import {startCamera} from "./Connection";
export default function Buttons() { 
    return(
        <>
        <button style={{width:"50px"}}>End</button>
        <button style={{width:"50px"}}>Mute</button>
        <button style={{width:"50px"}}>Quit Video</button>
        <button style={{width:"50px"}} id="startBtn" onClick={startCamera}>Start button</button>
        
        </>
    )
}