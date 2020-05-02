from server import app, route, socketio, mysocket


if __name__ == '__main__':
    socketio.run(app, debug=True)
