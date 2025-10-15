// 1st daily challenge

function makeAllCaps(words) {
    return new Promise((resolve, reject) => {
        // Check if all elements in the array are strings
        const allStrings = words.every(word => typeof word === 'string');
        
        if (allStrings) {
            // If all are strings, uppercase them and resolve
            const uppercasedWords = words.map(word => word.toUpperCase());
            resolve(uppercasedWords);
        } else {
            // If any element is not a string, reject
            reject('Array contains non-string elements');
        }
    });
}

function sortWords(uppercasedWords) {
    return new Promise((resolve, reject) => {
        // Check if array length is bigger than 4
        if (uppercasedWords.length > 4) {
            // Sort alphabetically and resolve
            const sortedWords = uppercasedWords.sort();
            resolve(sortedWords);
        } else {
            // If array length is 4 or less, reject
            reject('Array length must be greater than 4');
        }
    });
}


// 2nd daily challenge


function toJs(morse){
     return new Promise((resolve, reject) => {
        try {
            const morseJS = JSON.parse(morse);
            Object.keys(morseJS).length === 0 
                ? reject('Error: Morse JavaScript object is empty')
                : resolve(morseJS);
        } catch (error) {
            reject(`Error parsing JSON: ${error.message}`);
        }
    });
}


function toMorse(morseJS) {
    return new Promise((resolve, reject) => {
        // Ask user for input
        const userInput = prompt("Please enter a word or sentence:");
        
        // If user cancels or enters empty string
        if (userInput === null || userInput.trim() === '') {
            reject('Error: No input provided');
            return;
        }
        
        // Convert to lowercase for case-insensitive matching
        const input = userInput.toLowerCase();
        const morseTranslation = [];
        
        // Check each character and build morse translation
        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            
            // Skip spaces (allow spaces in sentences)
            if (char === ' ') {
                morseTranslation.push(' ');
                continue;
            }
            
            // Check if character exists in morse object
            if (morseJS[char]) {
                morseTranslation.push(morseJS[char]);
            } else {
                // Character not found in morse object
                reject(`Error: Character "${char}" doesn't exist in Morse code`);
                return;
            }
        }
        
        // If all characters are valid, resolve with morse translation
        resolve(morseTranslation);
    });
}


function joinWords(morseTranslation) {
    // Create a container div
    const container = document.createElement('div');
    // Join with line breaks and display
    const morseText = morseTranslation.join('\n');
    container.textContent = morseText;
    
    // Add to the DOM
    document.body.appendChild(container);
    
    return morseText; // Return for potential further use
}








