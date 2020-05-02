from flask import jsonify
from server import app
from .services.game_services import GameService


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/create_game')
def create_game():
    return GameService.create_new_game()

@app.route('/<string:seed>')
def get_cards(seed):
    return jsonify(GameService.get_cards(seed))


