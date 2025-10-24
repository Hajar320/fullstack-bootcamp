from menu_item import MenuItem
from menu_manager import MenuManager 


def show_user_menu():

 while True :
    print("----program menu----")
    print("------view an item (V)")
    print("-------add an item (A)")
    print("----delete an item (D)")
    print("----update an item (U)")
    print("------show the Menu(S)")
    choice = input(" Enter your choice (V/A/D/U/S) or 'X' to exit: ").strip().upper()

    if choice == 'V':
        view_item()
    elif choice == 'A':
        add_item_to_menu()
    elif choice == 'D':
        remove_item_from_menu()
    elif choice == 'U':
        update_item_from_menu()
    elif choice == 'S':
        show_menu()
    elif choice == 'X':
         show_menu()
         print("\nGoodbye!")
         return  # Exit the program
    else:
         print("Invalid choice! Please try again.")
        
        
        

def view_item():
    """
    View a specific item by name
    """
    print("\n VIEW ITEM")
    print("-" * 30)
    
    item_name = input("Enter the item name to view: ").strip()
    
    if not item_name:
        print(" Item name cannot be empty!")
        return
    
    item = MenuManager.get_by_name(item_name)
    
    if item:
        print(f"\n Item Found:")
        print(f"   Name: {item.name}")
        print(f"   Price: ${item.price}")
        print(f"   ID: {item.item_id}")
    else:
        print(f" Item '{item_name}' not found in the menu!")

def add_item_to_menu():
    """
    Add a new item to the menu
    """
    print("\n ADD NEW ITEM")
    print("-" * 30)
    
    name = input("Enter item name: ").strip()
    
    if not name:
        print(" Item name cannot be empty!")
        return
    
    # Check if item already exists
    existing_item = MenuManager.get_by_name(name)
    if existing_item:
        print(f" Item '{name}' already exists in the menu!")
        return
    
    # Get price with validation
    try:
        price = float(input("Enter item price: $").strip())
        if price < 0:
            print(" Price cannot be negative!")
            return
    except ValueError:
        print(" Invalid price! Please enter a number.")
        return
    
    # Create and save the new item
    new_item = MenuItem(name, price)
    item_id = new_item.save()
    
    if not item_id:
       # print(f" Item '{name}' added successfully with ID: {item_id}")
    #else:
        print(" Failed to add item!")

def remove_item_from_menu():
    """
    Delete an item from the menu
    """
    print("\n DELETE ITEM")
    print("-" * 30)
    
    item_name = input("\nEnter the item name to delete: ").strip()
    
    if not item_name:
        print(" Item name cannot be empty!")
        return
    
    # Find the item
    item = MenuManager.get_by_name(item_name)
    
    if not item:
        print(f" Item '{item_name}' not found in the menu!")
        return
    
    # Confirm deletion
    print(f"\nItem to delete: {item.name} - ${item.price}")
    confirm = input("Are you sure you want to delete this item? (y/n): ").strip().lower()
    
    if confirm == 'y' or confirm == 'yes':
        if item.delete():
            print(f" Item '{item_name}' deleted successfully!")
        else:
            print(" Failed to delete item!")
    else:
        print(" Deletion cancelled.")

def update_item_from_menu():
    """Update an existing item's name and/or price"""
    print("\n UPDATE ITEM\n" + "-" * 30)
    
    old_name = input("\nEnter item name to update: ").strip()
    if not old_name:
        print("Item name required!")
        return
    
    item = MenuManager.get_by_name(old_name)
    if not item:
        print(f"'{old_name}' not found!")
        return
    
    print(f"\nCurrent: {item.name} - ${item.price}")
    
    # Get new name
    new_name = input(f"New name (Enter to keep '{item.name}'): ").strip()
    new_name = new_name or item.name
    
    # Get new price
    new_price_input = input(f"New price (Enter to keep ${item.price}): ").strip()
    new_price = float(new_price_input) if new_price_input else item_price
    
    if new_price < 0:
        print("Price cannot be negative!")
        return
    
    # Check for name conflict
    if new_name != old_name and MenuManager.get_by_name(new_name):
        print(f"'{new_name}' already exists!")
        return
    
    # Update the item here
    # item.update(name=new_name, price=new_price)
    print("Item updated successfully!")


def show_menu():
    """
    Display the entire restaurant menu
    """
    print("\n RESTAURANT MENU")
    print("=" * 40)
    
    items = MenuManager.all_items()
    
    if not items:
        print("No items in the menu yet!")
        print("Use 'Add an Item' to create your first menu item.")
        return
    
    for item in items:
     print(f" - {item.name}: ${item.price}")




show_user_menu()


