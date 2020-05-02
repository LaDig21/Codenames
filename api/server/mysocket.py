from server import socketio
from flask_socketio import send, emit, join_room, leave_room
from .services.game_services import GameService


@socketio.on('connect')
def test_connect():
    print('New user connected')
    emit('connected','new connection',broadcast=True)

@socketio.on('disconnect')
def test_connect():
    print('User disconnected')
    emit('disconnected','new disconnection',broadcast=True)

@socketio.on('join_game')
def on_join(data):
    gamename = data['gamename']
    join_room(gamename)
    print('New game : ' + gamename)
    emit('get_game', GameService.get_cards(gamename), room=gamename)

@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)

@socketio.on('change_turn')
def change_turn(data):
    gamename = data['gamename']
    emit('get_game', GameService.change_game_turn(gamename), room=gamename)

@socketio.on('change_feedback')
def change_feedback(data):
    gamename = data['gamename']
    emit('get_game', GameService.change_feedback(data), room=gamename)

@socketio.on('create_round')
def create_round(data):
    gamename = data['gamename']
    emit('get_game', GameService.create_round(data['gamename']), room=gamename)


