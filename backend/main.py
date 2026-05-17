# save as server.py

from flask import Flask
from flask import send_file
from flask_socketio import SocketIO, emit, join_room
from flask_cors import CORS
from flask import current_app

app = Flask(__name__)
CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")

class MatchmakingService():
    def __init__(self):
        self.rooms = 0
    def make_room(self):
        id = self.rooms
        self.rooms += 1
        return str(id)

app.extensions["matchmaking_service"] = MatchmakingService()
    
    
@socketio.on('join_room')
def on_join(data):
    matchmaking = current_app.extensions["matchmaking_service"]
    room = None
    if "room" not in data:
        room = matchmaking.make_room()
    else:
        room = data["room"]
    join_room(room)
    return {
        "status": "ok",
        "room": room
    }

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/room/<room>')
def existing_room(room):
    return send_file('index.html')


@socketio.on("ready")
def ready(data):
    print(f"Ready: {data}")
    room = data["room"]
    emit("ready", room=room, include_self=False)

@socketio.on("offer")
def offer(data):
    print(f"Offer: {data}")
    room = data["room"]
    offer = data["offer"]
    emit("offer", offer, room=room, include_self=False)

@socketio.on("answer")
def answer(data):
    print(f"Answer: {data}")
    room = data["room"]
    answer = data["answer"]
    emit("answer", answer, room=room, include_self=False)

@socketio.on("candidate")
def candidate(data):
    print(f"Candidate: {data}")
    room = data["room"]
    candidate = data["candidate"]
    emit("candidate", candidate, room=room, include_self=False)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)
