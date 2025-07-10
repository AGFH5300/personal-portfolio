import random

print("=== Higher Lower Game ===")
print("Guess which celebrity has more Instagram followers!")
print()

data = [
    {'name': 'Instagram', 'follower_count': 690, 'description': 'Social media platform', 'country': 'United States'},  
    {'name': 'Cristiano Ronaldo', 'follower_count': 660, 'description': 'Footballer', 'country': 'Portugal'},         
    {'name': 'Ariana Grande', 'follower_count': 375, 'description': 'Musician and actress', 'country': 'United States'},  
    {'name': 'Dwayne Johnson', 'follower_count': 393, 'description': 'Actor and professional wrestler', 'country': 'United States'},  
    {'name': 'Selena Gomez', 'follower_count': 419, 'description': 'Musician and actress', 'country': 'United States'},  
    {'name': 'Kylie Jenner', 'follower_count': 393, 'description': 'Reality TV personality and businesswoman and Self-Made Billionaire', 'country': 'United States'},  
    {'name': 'Kim Kardashian', 'follower_count': 356, 'description': 'Reality TV personality and businesswoman', 'country': 'United States'},  
    {'name': 'Lionel Messi', 'follower_count': 505, 'description': 'Footballer', 'country': 'Argentina'},         
    {'name': 'Beyoncé', 'follower_count': 311, 'description': 'Musician', 'country': 'United States'},           
    {'name': 'Neymar', 'follower_count': 230, 'description': 'Footballer', 'country': 'Brasil'},                
    {'name': 'National Geographic', 'follower_count': 278, 'description': 'Magazine', 'country': 'United States'},  
    {'name': 'Justin Bieber', 'follower_count': 294, 'description': 'Musician', 'country': 'Canada'},             
    {'name': 'Taylor Swift', 'follower_count': 281, 'description': 'Musician', 'country': 'United States'},      
    {'name': 'Kendall Jenner', 'follower_count': 287, 'description': 'Reality TV personality and Model', 'country': 'United States'},  
    {'name': 'Jennifer Lopez', 'follower_count': 248, 'description': 'Musician and actress', 'country': 'United States'},  
    {'name': 'Nicki Minaj', 'follower_count': 225, 'description': 'Musician', 'country': 'Trinidad and Tobago'},  
    {'name': 'Nike', 'follower_count': 300, 'description': 'Sportswear multinational', 'country': 'United States'},  
    {'name': 'Khloé Kardashian', 'follower_count': 302, 'description': 'Reality TV personality and businesswoman', 'country': 'United States'},  
    {'name': 'Miley Cyrus', 'follower_count': 212, 'description': 'Musician and actress', 'country': 'United States'},  
    {'name': 'Katy Perry', 'follower_count': 204, 'description': 'Musician', 'country': 'United States'},          
    {'name': 'Kourtney Kardashian', 'follower_count': 218, 'description': 'Reality TV personality', 'country': 'United States'},  
    {'name': 'Kevin Hart', 'follower_count': 177, 'description': 'Comedian and actor', 'country': 'United States'},  
    {'name': 'Ellen DeGeneres', 'follower_count': 136, 'description': 'Comedian', 'country': 'United States'},    
    {'name': 'Real Madrid CF', 'follower_count': 176, 'description': 'Football club', 'country': 'Spain'},         
    {'name': 'FC Barcelona', 'follower_count': 141, 'description': 'Football club', 'country': 'Spain'},          
    {'name': 'Rihanna', 'follower_count': 149, 'description': 'Musician and businesswoman', 'country': 'Barbados'}, 
    {'name': 'Demi Lovato', 'follower_count': 153, 'description': 'Musician and actress', 'country': 'United States'},  
    {'name': "Victoria's Secret", 'follower_count': 78, 'description': 'Lingerie brand', 'country': 'United States'},  
    {'name': 'Zendaya', 'follower_count': 178, 'description': 'Actress and musician', 'country': 'United States'},  
    {'name': 'Shakira', 'follower_count': 92, 'description': 'Musician', 'country': 'Colombia'},                  
    {'name': 'Drake', 'follower_count': 142, 'description': 'Musician', 'country': 'Canada'},                     
    {'name': 'Chris Brown', 'follower_count': 144, 'description': 'Musician', 'country': 'United States'},        
    {'name': 'LeBron James', 'follower_count': 159, 'description': 'Basketball player', 'country': 'United States'},  
    {'name': 'Vin Diesel', 'follower_count': 103, 'description': 'Actor', 'country': 'United States'},            
    {'name': 'Cardi B', 'follower_count': 163, 'description': 'Musician', 'country': 'United States'},            
    {'name': 'David Beckham', 'follower_count': 88, 'description': 'Footballer', 'country': 'United Kingdom'},     
    {'name': 'Billie Eilish', 'follower_count': 124, 'description': 'Musician', 'country': 'United States'},     
    {'name': 'Justin Timberlake', 'follower_count': 72, 'description': 'Musician and actor', 'country': 'United States'},  
    {'name': 'UEFA Champions League', 'follower_count': 121, 'description': 'Club football competition', 'country': 'Europe'},  
    {'name': 'NASA', 'follower_count': 96, 'description': 'Space agency', 'country': 'United States'},           
    {'name': 'Emma Watson', 'follower_count': 73, 'description': 'Actress', 'country': 'United Kingdom'},        
    {'name': 'Shawn Mendes', 'follower_count': 70, 'description': 'Musician', 'country': 'Canada'},             
    {'name': 'Virat Kohli', 'follower_count': 273, 'description': 'Cricketer', 'country': 'India'},             
    {'name': 'Gigi Hadid', 'follower_count': 77, 'description': 'Model', 'country': 'United States'},           
    {'name': 'Priyanka Chopra Jonas', 'follower_count': 92, 'description': 'Actress and musician', 'country': 'India'},  
    {'name': '9GAG', 'follower_count': 55, 'description': 'Social media platform', 'country': 'China'},         
    {'name': 'Ronaldinho', 'follower_count': 77, 'description': 'Footballer', 'country': 'Brasil'},             
    {'name': 'Maluma', 'follower_count': 64, 'description': 'Musician', 'country': 'Colombia'},                 
    {'name': 'Camila Cabello', 'follower_count': 64, 'description': 'Musician', 'country': 'Cuba'},             
    {'name': 'NBA', 'follower_count': 90, 'description': 'Club Basketball Competition', 'country': 'United States'}  
]


logo = """
    __  ___       __             
   / / / (_)___ _/ /_  ___  _____
  / /_/ / / __ `/ __ \/ _ \/ ___/
 / __  / / /_/ / / / /  __/ /    
/_/ ///_/\__, /_/ /_/\___/_/     
   / /  /____/_      _____  _____
  / /   / __ \ | /| / / _ \/ ___/
 / /___/ /_/ / |/ |/ /  __/ /    
/_____/\____/|__/|__/\___/_/     
"""

vs = """
 _    __    
| |  / /____
| | / / ___/
| |/ (__  ) 
|___/____(_)
"""

def game_loop():
    score = 0
    should_continue = True

    account_a = random.choice(data)

    while should_continue:
        account_b = random.choice(data)

        while account_a == account_b:
            account_b = random.choice(data)

        print(f"Compare A: {account_a['name']}, a {account_a['description']} from {account_a['country']}")
        print(vs)
        print(f"Compare B: {account_b['name']}, a {account_b['description']} from {account_b['country']}")

        decision = input("Who has more followers ? Type 'A' or 'B'").lower()

        if account_a['follower_count'] > account_b['follower_count']:
            answer = "a"
        elif account_b['follower_count'] > account_a['follower_count']:
            answer = "b"
            account_a = account_b
        else:
            answer = "equal"

        if decision == answer:
            score += 1
            print(f"You are correct. Your current score is {score}")
        elif answer == "equal":
            score += 1
            print(f"They are equal. Your current score is {score}")
        else:
            print(f"That was incorrect. Your final score is {score}")
            should_continue = False


print(logo)
game_loop()