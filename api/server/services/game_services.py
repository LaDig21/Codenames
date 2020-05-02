import random
from flask import jsonify

from server import db
from ..models import Word, Game, Card

from .random_services import random_turn, random_string


class GameService:
   
    @staticmethod
    def get_cards(seed):
        res = Game.query.filter_by(gamename=seed).first()
        if res:
            return res.as_dict()
        else:
            return {'KO':1}

    @classmethod
    def create_new_game(cls):
        seed = random_string()
        res = Game.query.filter_by(gamename=seed).first()
        while res:
            seed = random_string()
            res = Game.query.filter_by(gamename=seed).first()
        game = Game(gamename=seed, turn = random_turn(seed), redscore = 7, bluescore = 7)
        game.init_score()
        word_list = Word.query.all()
        random.Random(seed).shuffle(word_list)
        db.session.add(game)
        db.session.commit()
        card = cls.create_new_card(seed, game, word_list)
        db.session.bulk_save_objects(card)   
        db.session.commit()
        return jsonify({'gamename' : game.gamename}), 200

    @classmethod
    def create_round(cls, seed):
        game = Game.query.filter_by(gamename=seed).first_or_404()
        seed = random_string()
        game_update = Game(gamename=seed, turn = random_turn(seed), redscore = 7, bluescore = 7)
        game_update.init_score()
        word_list = Word.query.all()
        random.Random(seed).shuffle(word_list)
        game = cls.update_game(game, game_update)
        db.session.add(game)
        db.session.commit()
        card_old = game.card
        for card in card_old:
            db.session.delete(card)
        card_update = cls.create_new_card(seed, game, word_list)
        db.session.bulk_save_objects(card_update)
        db.session.commit()
        return game.as_dict()

    @staticmethod
    def create_new_card(seed, game, word_list):
        team = ['black'] + ['white']*9 + ['red']*7 + ['blue']*7 + [game.turn]
        random.Random(seed).shuffle(team)
        card = []
        for i in range(25):
            card.append(Card(game_id=game.id, word_id=word_list[i].id, team = team[i]))
        return card

    @staticmethod
    def update_game(game_old, game_new):
        game_old.redscore = game_new.redscore
        game_old.bluescore = game_new.bluescore
        game_old.game_end = False
        game_old.turn = game_new.turn
        return game_old

    @staticmethod
    def change_game_turn(seed):
        game = Game.query.filter_by(gamename=seed).first_or_404()
        if game.turn == 'red':
            game.turn = 'blue'
        else:
            game.turn = 'red'
        db.session.add(game)
        db.session.commit()
        return game.as_dict()

    @classmethod
    def change_feedback(cls, data):
        game = Game.query.filter_by(gamename=data['gamename']).first_or_404()
        idx_card = data['index']
        card = Card.query.filter_by(id=game.card[idx_card].id).first_or_404()
        card.feedback = card.team
        game = cls.count_score(game,card)
        db.session.add(card)
        db.session.add(game)
        db.session.commit()
        return game.as_dict()

    @staticmethod
    def count_score(game,card):
        if card.team == 'red' :
            game.redscore -=1
            if game.turn == 'blue':
                game.turn = 'red'
            if game.redscore == 0 and not(game.game_end):
                game.redscoretotal += 1
                game.game_end = True
        elif card.team == 'blue':
            game.bluescore -=1
            if game.turn == 'red':
                game.turn = 'blue'
            if game.bluescore == 0 and not(game.game_end):
                game.bluescoretotal += 1
                game.game_end = True
        elif card.team == 'white' and not(game.game_end):
            if game.turn == 'red':
                game.turn = 'blue'
            else:
                game.turn = 'red'
        elif card.team == 'black' and not(game.game_end):
            game.game_end = True
            if game.turn == 'red':
                game.bluescoretotal += 1
            else:
                game.redscoretotal += 1
        return game


