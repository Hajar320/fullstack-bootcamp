
# exercice 1 
manufacturers_string = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"

manufacturers_list = manufacturers_string.split(", ")

print(f"There are {len(manufacturers_list)} manufacturers in the list.")

print("\nManufacturers in reverse order:")
manufacturers_list.sort(reverse=True)
for manufacturer in manufacturers_list:
    print(manufacturer)

o_count = 0
for manufacturer in manufacturers_list:
    if 'o' in manufacturer.lower():
        o_count += 1
print(f"\nNumber of manufacturers with 'o' in name: {o_count}")

no_i_count = 0
for manufacturer in manufacturers_list:
    if 'i' not in manufacturer.lower():
        no_i_count += 1
print(f"Number of manufacturers without 'i' in name: {no_i_count}")

duplicate_list = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]
unique_manufacturers = list(set(duplicate_list))

print(f"\nCompanies without duplicates: {', '.join(unique_manufacturers)}")
print(f"There are now {len(unique_manufacturers)} companies in the list.")

print("\nManufacturers in ascending order with reversed letters:")
unique_manufacturers.sort()  # Sort A-Z
for manufacturer in unique_manufacturers:
    reversed_name = manufacturer[::-1]
    print(reversed_name)


print("\n")
# exercice 2 

def get_full_name(first_name, last_name, middle_name=None):
    
    if middle_name:
        return f"{first_name} {middle_name} {last_name}"
    else:
        return f"{first_name} {last_name}"

# Test the function
print(get_full_name(first_name="john", middle_name="hooker", last_name="lee"))
print(get_full_name(first_name="bruce", last_name="lee"))

print("\n")
# exercice 3

MORSE_CODE_DICT = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
    '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
    ' ': '/'
}

REVERSE_MORSE_DICT = {value: key for key, value in MORSE_CODE_DICT.items()}

def text_to_morse(text):
    morse_code = []
    for char in text.upper():
        if char in MORSE_CODE_DICT:
            morse_code.append(MORSE_CODE_DICT[char])
        else:
            morse_code.append('?')  # Unknown character
    
    return ' '.join(morse_code)

def morse_to_text(morse_code):
   
    words = morse_code.split(' / ')  # Split words
    text = []
    
    for word in words:
        letters = word.split(' ')    # Split letters within word
        decoded_word = []
        
        for letter in letters:
            if letter in REVERSE_MORSE_DICT:
                decoded_word.append(REVERSE_MORSE_DICT[letter])
            elif letter:  # Non-empty string
                decoded_word.append('?')  # Unknown Morse code
        
        text.append(''.join(decoded_word))
    
    return ' '.join(text)


print(text_to_morse("hello everyone"))
print(morse_to_text(".... . .-.. .-.. --- / . ...- . .-. -.-- --- -. "))