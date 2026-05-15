export default function Camera() {
    return (
        <video
            autoPlay
            playsInline
            muted
            style={{ transform: "scaleX(-1)", objectFit: "contain", height: "100%" }} id="localVideo"
        />
    );
}
