export default function Camera() {
    return (
        <video
            autoPlay
            playsInline
            muted
            style={{ transform: "scaleX(-1)", objectFit: "contain", width: "100%" }} id="remoteVideo"
        />
    );
}
