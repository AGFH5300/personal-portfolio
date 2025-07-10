import random

def get_random_word():
    """Get a random word from the word list."""
    words = [
        'abruptly', 'absurd', 'abyss', 'affix', 'askew', 'avenue', 'awkward', 'axiom', 'azure', 'bagpipes',
        'bandwagon', 'banjo', 'bayou', 'beekeeper', 'bikini', 'blitz', 'blizzard', 'boggle', 'bookworm', 'boxcar',
        'boxful', 'buckaroo', 'buffalo', 'buffoon', 'buxom', 'buzzard', 'buzzing', 'buzzwords', 'caliph', 'cobweb',
        'cockiness', 'croquet', 'crypt', 'curacao', 'cycle', 'daiquiri', 'dirndl', 'disavow', 'dizzying', 'duplex',
        'dwarves', 'embezzle', 'equip', 'espionage', 'euouae', 'exodus', 'faking', 'fishhook', 'fixable', 'fjord',
        'flapjack', 'flopping', 'fluffiness', 'flyby', 'foxglove', 'frazzled', 'frizzled', 'fuchsia', 'funny', 'gabby',
        'galaxy', 'galvanize', 'gazebo', 'giaour', 'gizmo', 'glowworm', 'glyph', 'gnarly', 'gnostic', 'gossip',
        'grogginess', 'haiku', 'haphazard', 'hyphen', 'iatrogenic', 'icebox', 'injury', 'ivory', 'ivy', 'jackpot',
        'jaundice', 'jawbreaker', 'jaywalk', 'jazziest', 'jazzy', 'jelly', 'jigsaw', 'jinx', 'jiujitsu', 'jockey',
        'jogging', 'joking', 'jovial', 'joyful', 'juicy', 'jukebox', 'jumbo', 'kayak', 'kazoo', 'keyhole',
        'khaki', 'kilobyte', 'kiosk', 'kitsch', 'kiwifruit', 'klutz', 'knapsack', 'larynx', 'lengths', 'lucky',
        'luxury', 'lymph', 'marquis', 'matrix', 'megahertz', 'microwave', 'mnemonic', 'mystify', 'naphtha', 'nightclub',
        'nowadays', 'numbskull', 'nymph', 'onyx', 'ovary', 'oxidize', 'oxygen', 'pajama', 'peekaboo', 'phlegm',
        'pixel', 'pizazz', 'pneumonia', 'polka', 'pshaw', 'psyche', 'puppy', 'puzzling', 'quartz', 'queue',
        'quips', 'quixotic', 'quiz', 'quizzes', 'quorum', 'razzmatazz', 'rhubarb', 'rhythm', 'rickshaw', 'schnapps',
        'scratch', 'shiv', 'snazzy', 'sphinx', 'spritz', 'squawk', 'staff', 'strength', 'strengths', 'stretch',
        'stronghold', 'stymied', 'subway', 'swivel', 'syndrome', 'thriftless', 'thumbscrew', 'topaz', 'transcript',
        'transgress', 'transplant', 'triphthong', 'twelfth', 'twelfths', 'unknown', 'unworthy', 'unzip', 'uptown',
        'vaporize', 'vixen', 'vodka', 'voodoo', 'vortex', 'voyeurism', 'walkway', 'waltz', 'wave', 'wavy',
        'waxy', 'wellspring', 'wheezy', 'whiskey', 'whizzing', 'whomever', 'wimpy', 'witchcraft', 'wizard', 'woozy',
        'wristwatch', 'wyvern', 'xylophone', 'yachtsman', 'yippee', 'yoked', 'youthful', 'yummy', 'zephyr', 'zigzag',
        'zigzagging', 'zilch', 'zipper', 'zodiac', 'zombie'
    ]
    return random.choice(words).upper()

def display_word(word, correct_letters):
    """Display the word with guessed letters revealed."""
    display = ""
    for letter in word:
        if letter in correct_letters:
            display += letter + " "
        else:
            display += "_ "
    return display.strip()

def display_hangman(attempts_left):
    """Display hangman figure based on attempts left."""
    stages = [
        """
  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========
        """,
        """
  +---+
  |   |
  O   |
 /|\  |
 /    |
      |
=========
        """,
        """
  +---+
  |   |
  O   |
 /|\  |
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

def get_guess(guessed_letters):
    """Get a valid letter guess from the user."""
    while True:
        guess = input("Guess a letter: ").upper().strip()

        if len(guess) != 1:
            print("Please enter a single letter.")
            continue

        if not guess.isalpha():
            print("Please enter a letter from A-Z.")
            continue

        if guess in guessed_letters:
            print("You already guessed that letter!")
            continue

        return guess

def display_game_state(word, correct_letters, guessed_letters, attempts_left):
    """Display the current game state."""
    print(display_hangman(attempts_left))
    print(f"Word: {display_word(word, correct_letters)}")
    print(f"Attempts left: {attempts_left}")
    print(f"Guessed letters: {', '.join(sorted(guessed_letters))}")

def play_hangman():
    """Play a single game of hangman."""
    word = get_random_word()
    guessed_letters = set()
    correct_letters = set()
    max_attempts = 6
    attempts_left = max_attempts

    print(f"Word has {len(word)} letters")
    display_game_state(word, correct_letters, guessed_letters, attempts_left)

    while attempts_left > 0 and len(correct_letters) < len(set(word)):
        print()
        guess = get_guess(guessed_letters)
        guessed_letters.add(guess)

        if guess in word:
            correct_letters.add(guess)
            print(f"Good guess! '{guess}' is in the word.")
        else:
            attempts_left -= 1
            print(f"Sorry, '{guess}' is not in the word.")

        display_game_state(word, correct_letters, guessed_letters, attempts_left)

    # Game over
    print("\n" + "="*40)
    if len(correct_letters) == len(set(word)):
        print("Congratulations! You won!")
    else:
        print("Game Over! You ran out of attempts.")
    print(f"The word was: {word}")
    print("="*40)

    return len(correct_letters) == len(set(word))

def display_stats(games_played, games_won):
    """Display game statistics."""
    if games_played > 0:
        win_percentage = (games_won / games_played) * 100
        print(f"\nGame Statistics:")
        print(f"Games played: {games_played}")
        print(f"Games won: {games_won}")
        print(f"Win percentage: {win_percentage:.1f}%")

def main():
    """Main function to run the hangman game."""
    print("=== Hangman Game ===")
    print("Guess the word letter by letter!")
    print()

    games_played = 0
    games_won = 0

    while True:
        games_played += 1
        print(f"\nGame {games_played}")
        print("-" * 20)

        if play_hangman():
            games_won += 1

        display_stats(games_played, games_won)

        # Ask if user wants to play again
        print()
        play_again = input("Would you like to play another game? (y/n): ").lower().strip()
        if play_again not in ['y', 'yes']:
            print("Thanks for playing Hangman!")
            display_stats(games_played, games_won)
            break

if __name__ == "__main__":
    main()