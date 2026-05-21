const socket = io("http://localhost:5000");


let localStream;
let peerConnection;
let room;

const config = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
    ]
};


function emitAsync(event, data) {
    return new Promise((resolve) => {
        socket.emit(event, data, resolve);
    });
}

function get_room_number_from_current_url() {
    const url = window.location.href;
    const match = url.match(/\/room\/(\d+)$/);
    if (match) {
        return match[1];
    }
}
/** @type {() => void} */
export async function startCamera() {
    const url_room = get_room_number_from_current_url();
    const response = await emitAsync("join_room", {room: url_room});
    room = response.room;
    if (response.status != "ok") {
        alert("An error occured while joining the room");
    }
    window.history.replaceState(null, "", `/room/${room}`)
    
    const localVideo = document.getElementById("localVideo");
    const remoteVideo = document.getElementById("remoteVideo");

    localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });

    localVideo.srcObject = localStream;

    createPeerConnection(remoteVideo, room);

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    socket.emit("ready", {room: room});
}

export async function close() {
    
    //if (localStream) {
    //    localStream.getTracks().forEach(track => track.close());
    //}

    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
        console.log("Closing connection");

        socket.emit("close")
    }
}
function createPeerConnection(remoteVideo, room) {
    peerConnection = new RTCPeerConnection(config);

    peerConnection.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit("candidate", {candidate: event.candidate, room: room});
        }
    };
}

socket.on("ready", async () => {
    console.log("Got ready");
    if (!peerConnection) {
        createPeerConnection();
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });
    }

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit("offer", {room: room, offer: offer});
});

socket.on("offer", async (offer) => {
    console.log("Got offer");
    console.log(offer);
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

    socket.emit("answer", {room: room, answer: answer});
});

socket.on("answer", async (answer) => {
    console.log("Got answer");
    console.log(answer);
    await peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
    );
});

socket.on("candidate", async (candidate) => {
    console.log("Got candidate");
    console.log(candidate);
    try {
        await peerConnection.addIceCandidate(
            new RTCIceCandidate(candidate)
        );
    } catch (e) {
        console.error(e);
    }
});
