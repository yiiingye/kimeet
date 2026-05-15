# save as server.py

from flask import Flask
from flask import send_file
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    # Using request args for path will expose you to directory traversal attacks
    return send_file('index.html')

@socketio.on("ready")
def ready():
    emit("ready", broadcast=True, include_self=False)

@socketio.on("offer")
def offer(data):
    emit("offer", data, broadcast=True, include_self=False)

@socketio.on("answer")
def answer(data):
    emit("answer", data, broadcast=True, include_self=False)

@socketio.on("candidate")
def candidate(data):
    emit("candidate", data, broadcast=True, include_self=False)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)
