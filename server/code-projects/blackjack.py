import random

print("=== Blackjack Game ===")
print("Try to get as close to 21 as possible without going over!")
print()

logo = r"""
.------.            _     _            _    _            _    
|A_  _ |.          | |   | |          | |  (_)          | |   
|( \/ ).-----.     | |__ | | __ _  ___| | ___  __ _  ___| | __
| \  /|K /\  |     | '_ \| |/ _` |/ __| |/ / |/ _` |/ __| |/ /
|  \/ | /  \ |     | |_) | | (_| | (__|   <| | (_| | (__|   < 
`-----| \  / |     |_.__/|_|\__,_|\___|_|\_\ |\__,_|\___|_|\_
      |  \/ K|                            _/ |                
      `------'                           |__/           
"""


def deal_card():
    cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
    card = random.choice(cards)
    return card

def calculate_score(cards):
    if sum(cards) == 0 and len(cards) == 2:
        return 0
    if 11 in cards and sum(cards) > 21:
        cards.remove(11)
        cards.append(1)

    return sum(cards)


def compare(u_score, c_score):
    if u_score == c_score:
        return "Draw"
    elif c_score == 0:
        return "Lose, the opponent has a Blackjack"
    elif u_score == 0:
        return "Win, with a Blackjack"
    elif u_score > 21:
        return "You went over. You Lose"
    elif c_score > 21:
        return "Opponent went over. You Win"
    elif u_score > c_score:
        return "You Win"
    else:
        return "You Lose"



def show_rules():
    print("\n=== BLACKJACK RULES ===")
    print("1. Get as close to 21 as possible without going over")
    print("2. Face cards (J, Q, K) are worth 10 points")
    print("3. Aces are worth 11 or 1 (whichever is better)")
    print("4. You'll be dealt 2 cards to start")
    print("5. Choose 'y' to hit (get another card) or 'n' to stand")
    print("6. If you go over 21, you bust and lose")
    print("7. Dealer must hit on 16 and stand on 17")
    print("8. Blackjack (21 with 2 cards) beats regular 21")
    print("========================\n")

def play_game():
    user_cards = []
    computer_cards = []
    is_game_over = False
    for _ in range(2):
        user_cards.append(deal_card())
        computer_cards.append(deal_card())

    while not is_game_over:
        user_score = calculate_score(user_cards)
        computer_score = calculate_score(computer_cards)
        print(f"Your Cards: {user_cards}. Your current score: {user_score}")
        print(f"The Computer's cards: {computer_cards[0]}")

        if user_score == 0 or computer_score == 0 or user_score > 21:
            is_game_over = True
        else:
            user_should_deal = input("Type 'y' to get another card, type 'n' to pass")
            if user_should_deal == "y":
                user_cards.append(deal_card())
            else:
                is_game_over = True

    while computer_score != 0 and computer_score < 17:
        computer_cards.append(deal_card())
        computer_score = calculate_score(computer_cards)

    print(f"Your final hand: {user_cards}. Your final score is {user_score}")
    print(f"The Computer's final hand : {computer_cards}. The Computers final score is {computer_score}")

    print(compare(user_score, computer_score))


while True:
    choice = input("Do you want to play Blackjack? Type 'y' for yes, 'r' for rules, 'n' for no: ").lower()
    if choice == "y":
        print(logo)
        play_game()
    elif choice == "r":
        show_rules()
    elif choice == "n":
        print("Thanks for playing!")
        break
    else:
        print("Please enter 'y', 'r', or 'n'.")