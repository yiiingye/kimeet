import { close } from "./Connection";

export default function Buttons() {
    return (
        <>
            <button className="endCall" style={{ width: "50px" }} onClick={() => close()}>End</button>
            <button className="mute" style={{ width: "50px" }}>Mute</button>
        </>
    )
}
