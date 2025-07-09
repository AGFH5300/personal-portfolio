
import requests
import html

class Question:
    def __init__(self, text, answer):
        self.text = text
        self.answer = answer

class QuizBrain:
    def __init__(self, question_list):
        self.question_list = question_list
        self.question_number = 0
        self.score = 0
    
    def still_has_questions(self):
        return self.question_number < len(self.question_list)
    
    def next_question(self):
        current_question = self.question_list[self.question_number]
        self.question_number += 1
        user_answer = input(f"Q.{self.question_number}: {current_question.text} (True/False): ")
        self.check_answer(user_answer, current_question.answer)
    
    def check_answer(self, user_answer, correct_answer):
        if user_answer.lower() == correct_answer.lower():
            print("You got it right!")
            self.score += 1
        else:
            print("That's wrong")
            print(f"The correct answer is {correct_answer}")
        
        print(f"Your score is {self.score}/{self.question_number}")
        print()

def get_number_of_questions():
    print("How many questions would you like?")
    print("1. 10 questions")
    print("2. 15 questions") 
    print("3. 20 questions")
    print("4. Custom amount")
    
    choice = input("Enter your choice (1-4): ")
    
    if choice == "1":
        return 10
    elif choice == "2":
        return 15
    elif choice == "3":
        return 20
    elif choice == "4":
        while True:
            try:
                custom = int(input("Enter number of questions (1-50): "))
                if 1 <= custom <= 50:
                    return custom
                else:
                    print("Please enter a number between 1 and 50")
            except ValueError:
                print("Please enter a valid number")
    else:
        print("Invalid choice, defaulting to 10 questions")
        return 10

def get_category():
    categories = {
        "1": ("Any Category", ""),
        "2": ("General Knowledge", "9"),
        "3": ("Entertainment: Books", "10"),
        "4": ("Entertainment: Film", "11"),
        "5": ("Entertainment: Music", "12"),
        "6": ("Entertainment: Musicals & Theatres", "13"),
        "7": ("Entertainment: Television", "14"),
        "8": ("Entertainment: Video Games", "15"),
        "9": ("Entertainment: Board Games", "16"),
        "10": ("Science & Nature", "17"),
        "11": ("Science: Computers", "18"),
        "12": ("Science: Mathematics", "19"),
        "13": ("Mythology", "20"),
        "14": ("Sports", "21"),
        "15": ("Geography", "22"),
        "16": ("History", "23"),
        "17": ("Politics", "24"),
        "18": ("Art", "25"),
        "19": ("Celebrities", "26"),
        "20": ("Animals", "27"),
        "21": ("Vehicles", "28"),
        "22": ("Entertainment: Comics", "29"),
        "23": ("Science: Gadgets", "30"),
        "24": ("Entertainment: Japanese Anime & Manga", "31"),
        "25": ("Entertainment: Cartoon & Animations", "32")
    }
    
    print("\nSelect Category:")
    for key, (name, _) in categories.items():
        print(f"{key}. {name}")
    
    choice = input("Enter your choice (1-25): ")
    
    if choice in categories:
        return categories[choice][1]
    else:
        print("Invalid choice, using Any Category")
        return ""

def get_difficulty():
    print("\nSelect Difficulty:")
    print("1. Easy")
    print("2. Medium") 
    print("3. Hard")
    print("4. Any Difficulty")
    
    choice = input("Enter your choice (1-4): ")
    
    if choice == "1":
        return "easy"
    elif choice == "2":
        return "medium"
    elif choice == "3":
        return "hard"
    else:
        return ""

def fetch_questions(amount, category, difficulty):
    url = "https://opentdb.com/api.php"
    
    params = {
        "amount": amount,
        "type": "boolean"
    }
    
    if category:
        params["category"] = category
    
    if difficulty:
        params["difficulty"] = difficulty
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        if data["response_code"] == 0:
            return data["results"]
        else:
            print("Error fetching questions from API")
            return None
    except requests.RequestException as e:
        print(f"Error connecting to API: {e}")
        return None

def main():
    print("=== OpenTDB Quiz Game ===")
    print("Welcome to the trivia quiz!")
    print()
    
    # Get user preferences
    num_questions = get_number_of_questions()
    category = get_category()
    difficulty = get_difficulty()
    
    print(f"\nFetching {num_questions} questions...")
    
    # Fetch questions from API
    question_data = fetch_questions(num_questions, category, difficulty)
    
    if not question_data:
        print("Failed to fetch questions. Please try again later.")
        return
    
    # Create question objects
    question_bank = []
    for question in question_data:
        question_text = html.unescape(question["question"])
        question_answer = question["correct_answer"]
        new_question = Question(question_text, question_answer)
        question_bank.append(new_question)
    
    print(f"Successfully loaded {len(question_bank)} questions!")
    print("Answer with 'True' or 'False'\n")
    
    # Start the quiz
    quiz = QuizBrain(question_bank)
    while quiz.still_has_questions():
        quiz.next_question()
    
    print("You completed all questions!")
    print(f"Your final score is {quiz.score}/{quiz.question_number}")
    
    percentage = (quiz.score / quiz.question_number) * 100
    print(f"That's {percentage:.1f}%!")
    
    if percentage >= 80:
        print("Excellent work! 🎉")
    elif percentage >= 60:
        print("Good job! 👍")
    elif percentage >= 40:
        print("Not bad, keep practicing! 📚")
    else:
        print("Better luck next time! 💪")

if __name__ == "__main__":
    main()
