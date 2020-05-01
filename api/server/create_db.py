from server import db
from models import Word, Card, Game
from data.word import word_list

# Création de la DB avec une liste de mot
db.create_all()
for word in word_list:
    word_obj = Word(wordname = word)
    db.session.add(word_obj)
db.session.commit()

