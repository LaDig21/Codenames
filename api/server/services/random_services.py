import random
import string

def random_string(stringLength=6):
    """Generate a random string of fixed length """
    letters = string.ascii_uppercase
    return ''.join(random.choice(letters) for i in range(stringLength))

def random_turn(seed):
    turn_init = ['red', 'blue']
    random.Random(seed).shuffle(turn_init)
    return turn_init[0]