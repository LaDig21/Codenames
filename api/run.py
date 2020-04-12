from config import app
from models import Word, Game, Card
import route

if __name__ == '__main__':
    app.run(debug=True)