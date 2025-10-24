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

