# exercise 1
class Cat:
    def __init__(self, name, age):
        self.name = name
        self.age = age

cats = [
    Cat("hope", 3),
    Cat("Mint", 1),
    Cat("Fluffy", 2),
]

def find_oldest_cat(cat_list):
    oldest_cat = None
    
    for cat in cat_list:
        if oldest_cat is None or cat.age > oldest_cat.age:
            oldest_cat = cat
    
    return oldest_cat

oldest = find_oldest_cat(cats)
print(f"The oldest cat is {oldest.name}, who is {oldest.age} years old!")

       
      
# exercise 2
class Dog :

    def __init__(self,name,height):
        self.name = name
        self.height = height
        

    def bark(self):
        print(f"{self.name} goes woof !")

    def jump(self):
        x = self.height *2
        print(f"{self.name} jumps {x} cm high")


davids_dog = Dog("rex",50)
sarahs_dog = Dog("Teacup", 20)

davids_dog.bark()
davids_dog.jump() 

sarahs_dog .bark()
sarahs_dog .jump() 

print("the tallest dog is : ")
if davids_dog.height >sarahs_dog.height:
       print(f"{davids_dog.name}")
else :
     print(f"{sarahs_dog.name}")


print("\n")
# exercice 3

class Song :
    def __init__(self,lyrics):
        self.lyrics = lyrics
    
    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)

        
stairway= Song(["There’s a lady who's sure","all that glitters is gold", "and she’s buying a stairway to heaven"])

stairway.sing_me_a_song()

print("\n")
# exercice 4

from itertools import groupby

class Zoo:
    def __init__(self, zoo_name):
        self.animals = []  # Empty list for animals
        self.name = zoo_name  # Name of the zoo
    
    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)
            print(f"Added {new_animal} to the zoo!")
        else:
            print(f"{new_animal} is already in the zoo.")
    
    def get_animals(self):
        if not self.animals:
            print("The zoo has no animals yet.")
        else:
            print(f"Animals in {self.name}:")
            for animal in self.animals:
                print(f"- {animal}")
    
    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"Sold {animal_sold} from the zoo.")
        else:
            print(f"{animal_sold} is not in the zoo.")
    
    def sort_animals(self):
        if not self.animals:
            print(f"No animals to sort in {self.name}.")
            return {}
        
        sorted_animals = sorted(self.animals)
        
        animal_groups = {}
        for first_letter, group in groupby(sorted_animals, key=lambda animal: animal[0].upper()):
            animal_groups[first_letter] = list(group)
        
        return animal_groups
    
    def get_groups(self):
        grouped_animals = self.sort_animals()
        
        if not grouped_animals:
            return
        
        print(f"\nAnimals in {self.name} grouped by first letter:")
        for letter, animals in grouped_animals.items():
            print(f"{letter}: {', '.join(animals)}")


new_york_zoo = Zoo("New York Zoo")

new_york_zoo.get_animals()
 
new_york_zoo.add_animal("Lion")
new_york_zoo.add_animal("Tiger")
new_york_zoo.add_animal("Bear")
new_york_zoo.add_animal("Elephant")
new_york_zoo.add_animal("Eagle")
new_york_zoo.add_animal("Zebra")

new_york_zoo.get_animals()

grouped_animals = new_york_zoo.sort_animals()
print()

new_york_zoo.get_groups()
print()

print("6. Selling animals:")
new_york_zoo.sell_animal("Bear")
new_york_zoo.sell_animal("Penguin")  # Try selling non-existent animal
print()

print("7. Animals after selling:")
new_york_zoo.get_animals()
print()

print("8. Updated animal groups:")
new_york_zoo.get_groups()
print()

print("9. Adding more animals:")
new_york_zoo.add_animal("Penguin")
new_york_zoo.add_animal("Panther")
new_york_zoo.add_animal("Alligator")
print()

print("10. Final state of the zoo:")
new_york_zoo.get_animals()
print()
new_york_zoo.get_groups()