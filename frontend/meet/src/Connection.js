const socket = io("http://localhost:5000");


let localStream;
let peerConnection;

const config = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
    ]
};

/** @type {() => void} */
export async function startCamera() {
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
    console.log("HOLAAAA");
    localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });

    localVideo.srcObject = localStream;

    createPeerConnection();

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    socket.emit("ready");
    console.log("peer connected");
}

function createPeerConnection() {
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

    peerConnection = new RTCPeerConnection(config);

    peerConnection.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit("candidate", event.candidate);
        }
    };
}

socket.on("ready", async () => {

    if (!peerConnection) {
        createPeerConnection();

        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });
    }

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit("offer", offer);
});

socket.on("offer", async (offer) => {
    const localVideo = document.getElementById("localVideo");
    const remoteVideo = document.getElementById("remoteVideo");

    if (!peerConnection) {
        createPeerConnection();

        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });
    }

    await peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
    );

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket.emit("answer", answer);
});

socket.on("answer", async (answer) => {
    const localVideo = document.getElementById("localVideo");
    const remoteVideo = document.getElementById("remoteVideo");

    await peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
    );
});

socket.on("candidate", async (candidate) => {
    const localVideo = document.getElementById("localVideo");
    const remoteVideo = document.getElementById("remoteVideo");

    try {
        await peerConnection.addIceCandidate(
            new RTCIceCandidate(candidate)
        );
    } catch (e) {
        console.error(e);
    }
});