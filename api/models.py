from datetime import datetime
import random
from config import db

class Word(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    wordname = db.Column(db.String(100), unique = True, nullable = False)
    card = db.relationship('Card', backref = 'text', lazy = True)

    def __repr__(self):
        return f"Word('{self.id}', '{self.wordname}')"


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    gamename = db.Column(db.String(6), unique = True, nullable = False)
    date_created = db.Column(db.DateTime, nullable = False, default = datetime.utcnow)
    redscore = db.Column(db.Integer, nullable = False, default = 7)
    bluescore = db.Column(db.Integer, nullable = False, default = 7)
    redscoretotal = db.Column(db.Integer, nullable = False, default = 0)
    bluescoretotal = db.Column(db.Integer, nullable = False, default = 0)
    turn = db.Column(db.String(4), nullable = False)
    game_end = db.Column(db.Boolean, nullable = False, default = False)
    card = db.relationship('Card', backref = 'gamefrom', lazy = True)

    def __repr__(self):
        return f"Game('{self.id}', '{self.gamename}', '{self.date_created}', '{self.redscore}', '{self.bluescore}', '{self.redscoretotal}', '{self.bluescoretotal}')"
    
    def init_score(self):
        if self.turn == 'red':
            self.redscore +=1
        elif self.turn == 'blue':
            self.bluescore +=1

    def as_dict(self):
        word = [c.text.wordname for c in self.card]
        feedback = [c.feedback for c in self.card]
        team = [c.team for c in self.card]
        return {'gamename' : self.gamename, 'date_created' : self.date_created, 
                'redscore' : self.redscore, 'bluescore' : self.bluescore, 
                'redscoretotal' : self.redscoretotal, 'bluescoretotal' : self.bluescoretotal,
                'turn' : self.turn, 'game_end' : self.game_end, 
                'word' : word, 'feedback' : feedback, 'team' : team}


class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable = False)
    word_id = db.Column(db.Integer, db.ForeignKey('word.id'), nullable = False)
    feedback = db.Column(db.String(10),nullable = False, default = 'hidden')
    team = db.Column(db.String(10), nullable = False)


    def __repr__(self):
        return f"Card('{self.id}', '{self.game_id}', '{self.word_id}', '{self.feedback}')"
    
    def as_dict(self):
        return {'card' : self.text.wordname, 'feedback' : self.feedback}

    