
    // Exercice 1
function isBlank(str) {
    return str.length === 0;
}

console.log(isBlank(''));      // true
console.log(isBlank('abc'));   // false

// Exercice 2

function abbrevName(fullName) {
    const names = fullName.split(' ');
    if (names.length === 1) return fullName;
    
    return `${names[0]} ${names[1].charAt(0)}.`;
}

console.log(abbrevName("Robin Singh")); // "Robin S."
console.log(abbrevName("John Doe"));    // "John D."

// Exercice 3

function swapCase(str) {
    return str
        .split('')
        .map(char => {
            if (char === char.toUpperCase()) {
                return char.toLowerCase();
            } else {
                return char.toUpperCase();
            }
        })
        .join('');
}

console.log(swapCase('The Quick Brown Fox')); // 'tHE qUICK bROWN fOX'

// Exercice 4

function isOmnipresent(arr, value) {
    for (let subArray of arr) {
        if (!subArray.includes(value)) {
            return false;
        }
    }
    return true;
}

console.log(isOmnipresent([[3, 4], [8, 3, 2], [3], [9, 3], [5, 3], [4, 3]], 3)); // true
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6)); // false



