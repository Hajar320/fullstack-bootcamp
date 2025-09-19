
def index_dict(word):
    index_dict = {}
    
    for index, letter in enumerate(word):
        if letter not in index_dict:
            index_dict[letter] = [index]  # Create new list with current index
        else:
            index_dict[letter].append(index)  # Add index to existing list
    
    return index_dict


user_word = input("Enter a word: ")
result = index_dict(user_word)
print(result)
