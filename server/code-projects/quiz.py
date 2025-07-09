class Question:

    def __init__(self, text, answer):
        self.text = text
        self.answer = answer


question_data = []


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
        user_answer = input(f"Q.{self.question_number}: {current_question.text} (True/False)")
        self.check_answer(user_answer, current_question.answer)
    
    def check_answer(self, user_answer, correct_answer):
        if user_answer.lower() == correct_answer.lower():
            print("You got it right!")
            self.score += 1
        else:
            print("That's wrong")
            print(f"The correct answer is {correct_answer}")
    
        print(f"Your score is {self.score}/{self.question_number}")


question_bank = []
for question in question_data:
    question_text = question["text"]
    question_answer = question["answer"]
    new_question = Question(question_text, question_answer)
    question_bank.append(new_question)


quiz = QuizBrain(question_bank)
while quiz.still_has_questions():
    quiz.next_question()

print("You completed all questions")
print(f"Your final score is {quiz.score}/{quiz.question_number}")