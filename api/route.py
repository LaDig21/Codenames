from flask import url_for, redirect, jsonify, request
from config import app, db
from models import Word, Game, Card
import random
from services.random_services import random_turn, random_string
from services.game_rules import new_game, new_card, update_game, change_game_turn, score_count


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/change_turn', methods=['POST'])
def change_turn():
    data = request.get_json()
    game = Game.query.filter_by(gamename=data['gamename']).first_or_404()
    game = change_game_turn(game)
    db.session.add(game)
    db.session.commit()
    return jsonify(game.as_dict()), 200

@app.route('/change_feedback', methods=['POST'])
def change_feedback():
    data = request.get_json()
    game = Game.query.filter_by(gamename=data['gamename']).first_or_404()
    idx_card = data['index']
    card = Card.query.filter_by(id=game.card[idx_card].id).first_or_404()
    card.feedback = card.team
    game = score_count(game,card)
    db.session.add(card)
    db.session.add(game)
    db.session.commit()
    return jsonify(game.as_dict()), 200

@app.route('/create_round', methods=['POST'])
def create_round():
    data = request.get_json()
    game = Game.query.filter_by(gamename=data['gamename']).first_or_404()
    seed = random_string()
    game_update, word_list = new_game(seed)
    game = update_game(game, game_update)
    db.session.add(game)
    db.session.commit()
    card_old = game.card
    for card in card_old:
        db.session.delete(card)
    card_update = new_card(seed, game, word_list)
    db.session.bulk_save_objects(card_update)
    db.session.commit()
    return jsonify(game.as_dict()), 200

@app.route('/create_game')
def create_game():
    seed = random_string()
    res = Game.query.filter_by(gamename=seed).first()
    while res:
        seed = random_string()
        res = Game.query.filter_by(gamename=seed).first()
    game, word_list = new_game(seed)
    db.session.add(game)
    db.session.commit()
    card = new_card(seed, game, word_list)
    db.session.bulk_save_objects(card)   
    db.session.commit()
    return jsonify({'gamename' : game.gamename}), 200

@app.route('/<string:seed>')
def get_cards(seed):
    res = Game.query.filter_by(gamename=seed).first()
    if res:
        return jsonify(res.as_dict()), 200
    else:
        return jsonify({'KO':1}), 404


