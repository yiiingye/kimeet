import { useEffect, useRef } from "react";

export default function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const constraints: MediaStreamConstraints = {
            audio: false,
            video: {
                facingMode: "user",
            }
        };

        let stream: MediaStream;

        navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
            stream = mediaStream;
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        })
            .catch((err) => {
                console.error(`Cannot access to camera ${err}`);
            });
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        }
    }, []);

    return (
        <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ transform: "scaleX(-1)", objectFit:"contain", height:"100%" }}
        />
    )


}
