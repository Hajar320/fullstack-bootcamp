from menu_item import MenuItem
from menu_manager import MenuManager 


def show_user_menu():
  
    print("----program menu----")
    print("  view an item (V)")
    print("  add an item (A)")
    print("  delete an item (D)")
    print("  update an item (U)")
    print("  show an item (S)")
    choice = input("---------  ")
    
    if choice == 'V':
        view_item()
    elif choice == 'A':
        add_item()
    elif choice == 'D':
        delete_item()
    elif choice == 'U':
        update_item()
    elif choice == 'S':
        show_menu()
    elif choice == 'X':
        print(" Thank you for using Menu Editor! Goodbye!")
        
    else:
        print(" Invalid choice! Please try again.")
        

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

def add_item():
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
    
    if item_id:
        print(f" Item '{name}' added successfully with ID: {item_id}")
    else:
        print(" Failed to add item!")

def delete_item():
    """
    Delete an item from the menu
    """
    print("\n DELETE ITEM")
    print("-" * 30)
    
    # Show current menu first
    print("Current menu items:")
    show_menu_brief()
    
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

def update_item():
    """
    Update an existing item's name and/or price
    """
    print("\n UPDATE ITEM")
    print("-" * 30)
    
    # Show current menu first
    print("Current menu items:")
    show_menu_brief()
    
    old_name = input("\nEnter the current item name to update: ").strip()
    
    if not old_name:
        print(" Item name cannot be empty!")
        return
    
    # Find the item
    item = MenuManager.get_by_name(old_name)
    
    if not item:
        print(f" Item '{old_name}' not found in the menu!")
        return
    
    print(f"\nCurrent item: {item.name} - ${item.price}")
    
    # Get new name
    new_name = input(f"Enter new name (or press Enter to keep '{item.name}'): ").strip()
    if not new_name:
        new_name = item.name  # Keep current name
    
    # Get new price
    new_price_input = input(f"Enter new price (or press Enter to keep ${item.price}): ").strip()
    if new_price_input:
        try:
            new_price = float(new_price_input)
            if new_price < 0:
                print(" Price cannot be negative!")
                return
        except ValueError:
            print(" Invalid price! Update cancelled.")
            return
    else:
        new_price = item.price  # Keep current price
    
    # Check if new name conflicts with existing item
    if new_name != old_name:
        conflict_item = MenuManager.get_by_name(new_name)
        if conflict_item:
            print(f" Item '{new_name}' already exists! Update cancelled.")
            return
    
    # Perform update
    if item.update(new_name, new_price):
        print(f" Item updated successfully!")
        print(f"   New details: {new_name} - ${new_price}")
    else:
        print(" Failed to update item!")

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
    
    total_value = 0
    for i, item in enumerate(items, 1):
        print(f"{i:2d}. {item.name:<20} ${item.price:>6.2f}")
        total_value += item.price
    
    print("=" * 40)
    print(f"Total items: {len(items)}")
    print(f"Menu value: ${total_value:.2f}")

def show_menu_brief():
    """
    Show a brief version of the menu (for use in other functions)
    """
    items = MenuManager.all_items()
    
    if not items:
        print("   No items in the menu yet!")
        return
    
    for item in items:
        print(f"   - {item.name}: ${item.price}")

def main():
    """
    Main function to start the menu editor
    """
    print(" Welcome to the Restaurant Menu Editor!")
    print("   Let's manage your menu items...")
    
    try:
        show_user_menu()
    except KeyboardInterrupt:
        print("\n\n👋 Program interrupted by user. Goodbye!")
    except Exception as e:
        print(f"\n An error occurred: {e}")
        print("Please check your database connection and try again.")


if __name__ == "__main__":
    main()