import './App.css'
import Camera from "./Camera";
import SideCamera from "./SideCameras";
import Buttons from "./Buttons";
import { startCamera } from "./Connection";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        const start = async () => {
            await startCamera();
        };
        start();
    }, []);
    return (
        <>
            <div style={{ height: "100vh", position: "relative" }}>
                <div style={{ height: "100%" }}>
                    <Camera />
                </div>

                <div style={{ position: "absolute", right: "35%", margin: "5px", bottom: 20, zIndex: 10, width: "20%", height: "6%", display: "flex", flexDirection: "row" }}>
                    <Buttons />
                </div>

                <div
                    className='sideCameras'

                >
                    <div className="sideCamera" style={{ width: "100%", height: "300px" }}> <SideCamera /></div>
                </div>
            </div>
        </>
    )
}

export default App;
