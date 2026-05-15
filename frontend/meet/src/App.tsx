import './App.css'
import Camera from "./Camera";
import SideCamera from "./SideCameras";
import Buttons from "./Buttons";
function App() {
  return (
    <>
      <div style={{ height: "100vh", position: "relative" }}>
        <div style={{ backgroundColor: "cyan", height: "100%" }}>
          <Camera />
        </div>

        <div style={{ position: "absolute", right: "50%", margin: "5px", bottom: 20, zIndex: 10, width: "20%", height: "6%", display: "flex", flexDirection: "row" }}>
          <button className='endCall'>End Call</button>
          <button className='chat' >Chat</button>
          <Buttons />
        </div>

        <div
          className='sideCameras'
     
        >
            <div className="sideCamera" style={{ width: "100%", height: "300px", backgroundColor: "magenta" }}> <SideCamera /></div>
        </div>
      </div>
    </>
  )
}

export default App;