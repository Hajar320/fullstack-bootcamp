# exercice 1
import math
class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius

    def perimeter(self):
        return 2 * math.pi * self.radius
    
    def area(self):
        return math.pi * self.radius ** 2
    
    def definition(self):
        print("In geometry, a circle can be defined as a closed shape, two-dimensional shape, curved shape.")
        print(f"This circle has radius {self.radius}, perimeter {self.perimeter():.2f}, and area {self.area():.2f}")


my_circle = Circle(2)
my_per =my_circle.perimeter()
print("perimeter :", my_per) 
my_area = my_circle.area()
print("area :", my_area)


# exercice 2

class Mylist:
    def __init__(self,letters):
        self.letters= letters
        
    
    def reversed_list(self):
        rev_letters = self.letters.copy()
        rev_letters.reverse()

        return rev_letters
    
    def sorted_list(self):
        sort_letters = sorted(self.letters)
        return sort_letters
    

tryy = Mylist(['k','f','s'])

reversed_res =tryy.reversed_list()
print("Reversed list:", reversed_res) 
sorted_result = tryy.sorted_list()
print("Sorted list:", sorted_result)


# exercice 3

class MenuManager :
    def __init__(self):
        self.menu = [
            {
                'name': 'Soup',
                'price': 10,
                'spice_level': 'B',
                'gluten_index': False
            },
            {
                'name': 'Hamburger',
                'price': 15,
                'spice_level': 'A',
                'gluten_index': True
            },
            {
                'name': 'Salad',
                'price': 18,
                'spice_level': 'A',
                'gluten_index': False
            },
            {
                'name': 'French Fries',
                'price': 5,
                'spice_level': 'C',
                'gluten_index': False
            },
            {
                'name': 'Beef bourguignon',
                'price': 25,
                'spice_level': 'B',
                'gluten_index': True
            }
        ]
                
    def add_item(self,name,price,spice,gluten):
        
        new_dish ={ 
            'name':name,
            'price':price,
            'spice':spice,
            'gluten':gluten
                   }
        self.menu.append(new_dish)

    def update_item(self,name,price,spice,gluten):
         for dish in self.menu:
            if dish['name'].lower() == name.lower():
                dish['price'] = price
                dish['spice_level'] = spice
                dish['gluten_index'] = gluten
                print(f"'{name}' has been updated!")
                return
         print(f" '{name}' is not in the menu.")

    def remove_item(self, name):
        for i, dish in enumerate(self.menu):
            if dish['name'].lower() == name.lower():
                removed_dish = self.menu.pop(i)
                print(f" '{name}' has been removed from the menu.")
                print("Updated menu:")
                self.print_menu()
                return
        
        print(f" Manager notification: '{name}' is not in the menu.")

