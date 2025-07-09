import random

print("=== Hangman Game ===")
print("Guess the word letter by letter!")
print()

words = [
'abruptly',
'absurd',
'abyss',
'affix',
'askew',
'avenue',
'awkward',
'axiom',
'azure',
'bagpipes',
'bandwagon',
'banjo',
'bayou',
'beekeeper',
'bikini',
'blitz',
'blizzard',
'boggle',
'bookworm',
'boxcar',
'boxful',
'buckaroo',
'buffalo',
'buffoon',
'buxom',
'buzzard',
'buzzing',
'buzzwords',
'caliph',
'cobweb',
'cockiness',
'croquet',
'crypt',
'curacao',
'cycle',
'daiquiri',
'dirndl',
'disavow',
'dizzying',
'duplex',
'dwarves',
'embezzle',
'equip',
'espionage',
'euouae',
'exodus',
'faking',
'fishhook',
'fixable',
'fjord',
'flapjack',
'flopping',
'fluffiness',
'flyby',
'foxglove',
'frazzled',
'frizzled',
'fuchsia',
'funny',
'gabby',
'galaxy',
'galvanize',
'gazebo',
'giaour',
'gizmo',
'glowworm',
'glyph',
'gnarly',
'gnostic',
'gossip',
'grogginess',
'haiku',
'haphazard',
'hyphen',
'iatrogenic',
'icebox',
'injury',
'ivory',
'ivy',
'jackpot',
'jaundice',
'jawbreaker',
'jaywalk',
'jazziest',
'jazzy',
'jelly',
'jigsaw',
'jinx',
'jiujitsu',
'jockey',
'jogging',
'joking',
'jovial',
'joyful',
'juicy',
'jukebox',
'jumbo',
'kayak',
'kazoo',
'keyhole',
'khaki',
'kilobyte',
'kiosk',
'kitsch',
'kiwifruit',
'klutz',
'knapsack',
'larynx',
'lengths',
'lucky',
'luxury',
'lymph',
'marquis',
'matrix',
'megahertz',
'microwave',
'mnemonic',
'mystify',
'naphtha',
'nightclub',
'nowadays',
'numbskull',
'nymph',
'onyx',
'ovary',
'oxidize',
'oxygen',
'pajama',
'peekaboo',
'phlegm',
'pixel',
'pizazz',
'pneumonia',
'polka',
'pshaw',
'psyche',
'puppy',
'puzzling',
'quartz',
'queue',
'quips',
'quixotic',
'quiz',
'quizzes',
'quorum',
'razzmatazz',
'rhubarb',
'rhythm',
'rickshaw',
'schnapps',
'scratch',
'shiv',
'snazzy',
'sphinx',
'spritz',
'squawk',
'staff',
'strength',
'strengths',
'stretch',
'stronghold',
'stymied',
'subway',
'swivel',
'syndrome',
'thriftless',
'thumbscrew',
'topaz',
'transcript',
'transgress',
'transplant',
'triphthong',
'twelfth',
'twelfths',
'unknown',
'unworthy',
'unzip',
'uptown',
'vaporize',
'vixen',
'vodka',
'voodoo',
'vortex',
'voyeurism',
'walkway',
'waltz',
'wave',
'wavy',
'waxy',
'wellspring',
'wheezy',
'whiskey',
'whizzing',
'whomever',
'wimpy',
'witchcraft',
'wizard',
'woozy',
'wristwatch',
'wyvern',
'xylophone',
'yachtsman',
'yippee',
'yoked',
'youthful',
'yummy',
'zephyr',
'zigzag',
'zigzagging',
'zilch',
'zipper',
'zodiac',
'zombie',
]

# Select random word
word = random.choice(words).upper()
guessed_letters = set()
correct_letters = set()
max_attempts = 6
attempts_left = max_attempts

def display_word():
    display = ""
    for letter in word:
        if letter in correct_letters:
            display += letter + " "
        else:
            display += "_ "
    return display.strip()

def display_hangman(attempts_left):
    stages = [
        """
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========
        """,
        """
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========
        """,
        """
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========
        """,
        """
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========
        """,
        """
  +---+
  |   |
  O   |
  |   |
      |
      |
=========
        """,
        """
  +---+
  |   |
  O   |
      |
      |
      |
=========
        """,
        """
  +---+
  |   |
      |
      |
      |
      |
=========
        """
    ]
    return stages[attempts_left]

print(f"Word has {len(word)} letters")
print(display_hangman(attempts_left))
print(f"Word: {display_word()}")
print(f"Attempts left: {attempts_left}")

while attempts_left > 0 and len(correct_letters) < len(set(word)):
    print()
    guess = input("Guess a letter: ").upper().strip()
    
    if len(guess) != 1 or not guess.isalpha():
        print("Please enter a single letter!")
        continue
    
    if guess in guessed_letters:
        print("You already guessed that letter!")
        continue
    
    guessed_letters.add(guess)
    
    if guess in word:
        correct_letters.add(guess)
        print(f"Good guess! '{guess}' is in the word.")
    else:
        attempts_left -= 1
        print(f"Sorry, '{guess}' is not in the word.")
    
    print(display_hangman(attempts_left))
    print(f"Word: {display_word()}")
    print(f"Attempts left: {attempts_left}")
    print(f"Guessed letters: {', '.join(sorted(guessed_letters))}")

# Game over
print("\n" + "="*30)
if len(correct_letters) == len(set(word)):
    print("Congratulations! You won!")
    print(f"The word was: {word}")
else:
    print("Game Over! You ran out of attempts.")
    print(f"The word was: {word}")
print("="*30)