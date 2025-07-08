import random

print("=== Hangman Game ===")
print("Guess the word letter by letter!")
print()

# Word list
words = [
    "python", "programming", "computer", "algorithm", "function",
    "variable", "coding", "software", "development", "technology",
    "javascript", "website", "database", "network", "security"
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
    print("🎉 Congratulations! You won!")
    print(f"The word was: {word}")
else:
    print("💀 Game Over! You ran out of attempts.")
    print(f"The word was: {word}")
print("="*30)