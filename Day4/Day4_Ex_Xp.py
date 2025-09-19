class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'
    

class Siamese(Cat):
     def sing(self, sounds):
        return f'{sounds}'


all_cats = [
    Bengal("Whiskers", 3),
    Chartreux("Mittens", 2),
    Siamese("Fluffy", 4)
]

sara_pets = Pets(all_cats)
sara_pets.walk()



# exercise 2 /3:
class Dog :
    def __init__(self,name,age,weight):
         
         self.name = name
         self.age =age
         self.weight =weight
        
    def bark(self):
         return f" {self.name} is barking "
    
    def run_speed(self):
    
         return self.weight /(self.age *10)
    
    def fight(self,other_dog):
       my_power = self.run_speed()*self.weight
       other_power = other_dog.run_speed()*other_dog.weight
          
       if my_power > other_power:
            return f"{self.name} won the fight against {other_dog.name}!"
       elif other_power > my_power:
            return f"{other_dog.name} won the fight against {self.name}!"
       else:
            return f"It's a tie between {self.name} and {other_dog.name}!"
         
class Petdog (Dog):
      def __init__(self, name, age, weight, trained=False):
        super().__init__(name, age, weight)
        self.trained = trained
    
      def train(self) :
            bark_res = super().bark()
            self.trained = True
            return bark_res
      
      def play(self,*list_name):
        dog_names =list(list_name) +[self.name]
           
        return f"{', '.join(dog_names)} all play together."
           
      def do_a_trick(self) :
           import random
           if self.trained:
            tricks = [
                f"{self.name} does a barrel roll",
                f"{self.name} stands on his back legs",
                f"{self.name} shakes your hand",
                f"{self.name} plays dead"
            ]
            return random.choice(tricks)
           else:
            return f"{self.name} is not trained yet"

         

dog1 = Dog("Rex", 3, 15)
dog2 = Dog("Buddy", 5, 20)

print(dog1.bark())  
print(dog1.run_speed())  
print(dog1.fight(dog2))  

pet_dog = Petdog("Max", 2, 12)
print(pet_dog.play("Rex", "Buddy"))  

print(pet_dog.train())  
print(pet_dog.trained)  

print(pet_dog.do_a_trick()) 

#exercise 4

class Family():
    def __init__(self,last_name,members = None):

        self.members = members if members is not None else []
        self.last_name = last_name
    
    def born(self,**kwargs):
        self.members.append(kwargs)
        child_name=kwargs.get('name','the baby')
        print(f"Congratulations to the {self.last_name} family on the birth of {child_name}!")
    
    def is_18(self,name):
        
        for member in self.members :
            if member['name']== name:
                return member.get('age',0) >=18
        return False

    def family_presentation(self):
        print(f"Family Name: {self.last_name}")
        print("Family Members:")
        print("-" * 10)
        for member in self.members :
            details = []
            for key, value in member.items():
                details.append(f"{key}: {value}")
            print(", ".join(details))
            print("-" * 30)

        
kassi_members =     [
        {'name':'Michael','age':35,'gender':'Male','is_child':False,'power': 'fly','incredible_name':'MikeFly'},
        {'name':'Sarah','age':32,'gender':'Female','is_child':False,'power': 'read minds','incredible_name':'SuperWoman'}
    ]

my_family = Family("kassi",kassi_members)

my_family.family_presentation()


print("\n=== FAMILY PRESENTATION ===")
my_family.family_presentation()


# exercise 5

class TheIncredibles(Family):
    def __init__(self,last_name,members = None):
        super().__init__(last_name,members)

    def use_power(self,name):
        for member in self.members :
            if member['name'] == name:
                if member['age'] >= 18 :
                    print(f"{name}'s power: {member['power']}")
                    return
                else:
                    raise Exception(f"{name} is not over 18 years old.")
        print(f"{name} not found in the family")
        
    def  incredible_presentation(self):
        print("*Here is our powerful family **")
        print(f"the family's last name {self.last_name}")
        super().family_presentation()
        
    
    
incredibles_members = [
    {'name':'Michael','age':35,'gender':'Male','is_child':False,'power': 'fly','incredible_name':'MikeFly'},
    {'name':'Sarah','age':32,'gender':'Female','is_child':False,'power': 'read minds','incredible_name':'SuperWoman'}
]
super_family =TheIncredibles("Incredibles",incredibles_members)

super_family.incredible_presentation()

super_family.born(
    name='Jack', 
    age=0, 
    gender='Male', 
    is_child=True, 
    power='Unknown Power', 
    incredible_name='BabyJack'
)

super_family.incredible_presentation()