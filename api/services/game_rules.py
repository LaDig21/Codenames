from models import Game, Word, Card
from services.random_services import random_turn
import random

def new_game(seed):
    game = Game(gamename=seed, turn = random_turn(seed), redscore = 7, bluescore = 7)
    game.init_score()
    word_list = Word.query.all()
    random.Random(seed).shuffle(word_list)  
    return game, word_list
    

def new_card(seed, game, word_list):
    team = ['black'] + ['white']*9 + ['red']*7 + ['blue']*7 + [game.turn]
    random.Random(seed).shuffle(team)
    card = []
    for i in range(25):
        card.append(Card(game_id=game.id, word_id=word_list[i].id, team = team[i]))
    return card

def update_game(game_old, game_new):
    game_old.redscore = game_new.redscore
    game_old.bluescore = game_new.bluescore
    game_old.game_end = False
    game_old.turn = game_new.turn
    return game_old

def change_game_turn(game):
    if game.turn == 'red':
        game.turn = 'blue'
    else:
        game.turn = 'red'
    return game

def score_count(game,card):
    if card.team == 'red' :
        game.redscore -=1
        if game.turn == 'blue':
            game = change_game_turn(game)
        if game.redscore == 0 and not(game.game_end):
            game.redscoretotal += 1
            game.game_end = True
    elif card.team == 'blue':
        game.bluescore -=1
        if game.turn == 'red':
            game = change_game_turn(game)
        if game.bluescore == 0 and not(game.game_end):
            game.bluescoretotal += 1
            game.game_end = True
    elif card.team == 'white' and not(game.game_end):
        game = change_game_turn(game)
    elif card.team == 'black' and not(game.game_end):
        game.game_end = True
        if game.turn == 'red':
            game.bluescoretotal += 1
        else:
            game.redscoretotal += 1
    return game


