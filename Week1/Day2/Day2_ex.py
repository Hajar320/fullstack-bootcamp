import json

# exercice 1 

keys = ['Ten', 'Twenty', 'Thirty']

values = [10, 20, 30]

dict_keys = dict(zip(keys,values))

print (dict_keys)

print("\n")
# exercice 2

family = {
    "rick": 43, 
    'beth': 13, 
    'morty': 5, 
    'summer': 8
    }
#print(family.items())

person_cost = {
    name: (
        0  if age < 3 else
        10  if 3 <= age <= 12 else
       15 
    )
    for name, age in family.items()
}
print(person_cost)

total_cost = sum(person_cost.values())
print(f"the family’s total cost for the movies is : {total_cost}")


your_family = {}
print(your_family)

while True:
    name = input("what's your name : ")
    if name.lower() == "quit":
        break
    age = input("what's your age : ")
    if age.isdigit():
        your_family[name] = int(age)
    else:
        print("Please enter a valid age (number).")

print("Your family:", your_family)

print("\n")
# exercice 3

brand = json.loads('''
{
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}
''' )

#print(brand)
brand['number_stores']=2
#print(brand['number_stores'])

#print(f"zaras clients are {" ,".join(brand['type_of_clothes'][:3])} and people who like to stay at {"".join(brand['type_of_clothes'][-1])} ")

brand['country_creation']= 'spain'

#print(brand)


#exist = brand.get('international_competitors', 'Contact not found')
#print(exist)
brand["international_competitors"] = [brand["international_competitors"], "Desigual"]
#klkprint(brand)

#del brand['creation_date']
#print(brand)

#print(brand['international_competitors'][-1])
print("Major clothes colors in the US:", ", ".join(brand['major_color']['US']))
print("Number of key-value pairs in brand:", len(brand))
print("Keys of the brand dictionary:", list(brand.keys()))

more_on_zara = {
    'creation_date': 1975,
    'number_stores': 10000
}

merges_dict = {**brand, **more_on_zara}
print(merges_dict)
print("Value of 'number_stores':", merges_dict['number_stores'])

print("\n")
# exercice 4 

def describe_city(city,country="morocco"):
    
    return print(f"{city} is in {country}")

describe_city('meknes')
describe_city('tokyo','japan')

print("\n")
# exercice 5

import random

def num_fun(user_number):
    if not (1 <= user_number <= 100):
        print("Please enter a number between 1 and 100.")
        return
    random_number = random.randint(1, 100)
    print(f"Your number: {user_number}")
    print(f"Randomly generated number: {random_number}")

num_fun(9)
num_fun(-9)

print("\n")
# exercice 6 

def make_shirt(size="large",text="i love python"):
    print(f"The size of the shirt is {size} and the text is {text}")

make_shirt()
make_shirt('medium')
make_shirt(text='let us go camping')

custom_text = "can you see me"
shirt_size = "tiny"

make_shirt(text=custom_text, size=shirt_size)

print("\n")
# exercice 7

#1
import random
def get_random_temp() :
      
      return random.randint(-10,40)

get_random_temp()

print("\n")
#2

def main():
    tempe = get_random_temp()
    print(f"The temperature right now is {tempe} degrees Celsius")

main()

print("\n")
#3
def main():
    tempe = get_random_temp()
    
    if tempe <= 0:
        print(f"{tempe}°C: Brrr, that's freezing! Wear some extra layers today")
    elif 0 < tempe < 16:
        print(f"{tempe}°C: Quite chilly! Don't forget your coat")
    elif 16 <= tempe <= 23:
        print(f"{tempe}°C: The weather is nice today")
    elif 24 <= tempe <= 32:
        print(f"{tempe}°C: Let's go for a picnic")
    elif 32 < tempe <= 40:
        print(f"{tempe}°C: It's so hot today!")
    else:
        print(f"{tempe}°C: Extreme temperature! Be careful.")


main()

print("\n")
#4

def get_random_temp(season) :
      
      if season =="summer" :
        rnd_num =   random.randint(30,40)
        print(f" today : {rnd_num} degree")
      elif season == "fall" :
            rnd_num =   random.randint(17,22)
            print(f" today : {rnd_num} degree")
      elif season == "winter" :
            rnd_num =   random.randint(-10,16)
            print(f" today : {rnd_num} degree")
      elif season == "spring" :
            rnd_num =   random.randint(23,29)
            print(f" today : {rnd_num} degree")

#get_random_temp('summer')

def main(season):
    tempe = get_random_temp(season)
    
    if season =="summer" :
        print(" hello summer")
    elif season =="spring" :
        print("hello spring ")
    elif season =="winter" :
        print(" hello winter")
    elif season =="fall" :
        print(" hello fall")


user_season = input ("enetr a season: ")
main(user_season)

print("\n")
# exercice 8

data = [
    {
        "question": "What is Baby Yoda's real name?",
        "answer": "Grogu"
    },
    {
        "question": "Where did Obi-Wan take Luke after his birth?",
        "answer": "Tatooine"
    },
    {
        "question": "What year did the first Star Wars movie come out?",
        "answer": "1977"
    },
    {
        "question": "Who built C-3PO?",
        "answer": "Anakin Skywalker"
    },
    {
        "question": "Anakin Skywalker grew up to be who?",
        "answer": "Darth Vader"
    },
    {
        "question": "What species is Chewbacca?",
        "answer": "Wookiee"
    }
]


correct_answers = 0
wrong_answers = 0
mistakes = []


for i, q in enumerate(data, 1):
    print(f"\nQuestion {i}: {q['question']}")
    user_answer = input("Your answer: ")
    
    # Check if answer is correct
    if user_answer.lower() == q['answer'].lower():
        print("Correct!")
        correct_answers += 1
    else:
        print(f"Wrong! The correct answer is: {q['answer']}")
        wrong_answers += 1
        mistakes.append({
            "question": q['question'],
            "your_answer": user_answer,
            "correct_answer": q['answer']
        })



print("YOUR RESULTS:")
print(f"Correct answers: {correct_answers}")
print(f"Wrong answers: {wrong_answers}")


if mistakes:
    print("\n Questions you got wrong:")
    for mistake in mistakes:
        print(f"- {mistake['question']}")
        print(f"  Your answer: {mistake['your_answer']}")
        print(f"  Correct answer: {mistake['correct_answer']}")
        print()

# Final message
if correct_answers == len(q):
    print("Perfect score! You're a Star Wars expert!")
elif correct_answers >= len(q) / 2:
    print("Good job!")
else:
    print("Keep practicing!")



