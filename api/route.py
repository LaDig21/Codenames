from flask import url_for, redirect, jsonify
from config import app, db
from models import Word, Game, Card
import random


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/create_game/<string:seed>')
def create_game(seed):
    res = Game.query.filter_by(gamename=seed).first()
    if res:
        return str(res)
    turn_init = ['red', 'blue']
    random.Random(seed).shuffle(turn_init)
    game = Game(gamename=seed, turn = turn_init[0], redscore = 7, bluescore = 7)
    game.init_score()
    db.session.add(game)
    word_list = Word.query.all()
    random.Random(seed).shuffle(word_list)
    team = ['black'] + ['white']*9 + ['red']*7 + ['blue']*7 + [game.turn]
    random.Random(seed).shuffle(team)
    for i in range(25):
        card = Card(game_id=game.id, word_id=word_list[i].id, team = team[i])
        db.session.add(card)
    db.session.commit()
    return str([])

@app.route('/<string:seed>')
def get_cards(seed):
    res = Game.query.filter_by(gamename=seed).first()
    return jsonify(res.as_dict()) 


