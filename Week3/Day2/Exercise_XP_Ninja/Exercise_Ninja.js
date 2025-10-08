// Exercise 1: Random Number

// Get a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(`Random number: ${randomNumber}`);

// Console.log all even numbers from 0 to the random number
console.log(`Even numbers from 0 to ${randomNumber}:`);
for (let i = 0; i <= randomNumber; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}

// Exercise 2: Capitalized Letters
function capitalize(str) {
    let evenIndexed = '';
    let oddIndexed = '';
    
    // Loop through each character in the string
    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0) {
            // Even index - capitalize
            evenIndexed += str[i].toUpperCase();
            oddIndexed += str[i].toLowerCase();
        } else {
            // Odd index - keep lowercase for evenIndexed, capitalize for oddIndexed
            evenIndexed += str[i].toLowerCase();
            oddIndexed += str[i].toUpperCase();
        }
    }
    
    return [evenIndexed, oddIndexed];
}

// Test the function
console.log(capitalize("abcdef")); // ['AbCdEf', 'aBcDeF']

// Exercise 3 : Is palindrome?

function isPalindrome(str) {
    // Clean the string: remove spaces and punctuation, convert to lowercase
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    // Reverse the string and compare
    const reversedStr = cleanStr.split('').reverse().join('');
    
    return cleanStr === reversedStr;
}
console.log("kayak:", isPalindrome("kayak"));           // true
console.log("hello:", isPalindrome("hello"));           // false

// Exercise 4 : Biggest Number

function biggestNumberInArray(arrayNumber) {
    // Filter out non-numbers and handle empty array
    const numbers = arrayNumber.filter(item => typeof item === 'number' && !isNaN(item));
    
    if (numbers.length === 0) return 0;
    
    return Math.max(...numbers);
}
console.log("['a', 3, 5, 1]:", biggestNumberInArray(['a', 3, 5, 1])); // 5

// Exercise 5: Unique Elements

// Using Set to get unique values (most efficient)
function getUniqueElements(arr) {
    return [...new Set(arr)];
}
console.log("[1,2,3,3,3,3,4,5]:", getUniqueElements([1,2,3,3,3,3,4,5])); // [1,2,3,4,5]

// Exercice 6

function createCalendar(year, month) {
    // 1. Create table
    const table = document.createElement('table');
    
    // 2. Create header row with days
    const headerRow = document.createElement('tr');
    const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
    
    days.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    
    table.appendChild(headerRow);
    
    // 3. Find first day and total days
    const firstDay = new Date(year, month - 1, 1).getDay(); // 0=Sun, 1=Mon, etc.
    const totalDays = new Date(year, month, 0).getDate();
    
    // Convert to Monday-first (0 = Monday)
    let startFrom = firstDay === 0 ? 6 : firstDay - 1;
    
    // 4. Create calendar days
    let dayCount = 1;
    let row = document.createElement('tr');
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startFrom; i++) {
        const emptyCell = document.createElement('td');
        emptyCell.textContent = '';
        row.appendChild(emptyCell);
    }
    
    // Add all days of the month
    for (let i = startFrom; i < 35; i++) {
        if (dayCount > totalDays) break;
        
        const cell = document.createElement('td');
        cell.textContent = dayCount;
        row.appendChild(cell);
        dayCount++;
        
        // Start new row every 7 days
        if ((i + 1) % 7 === 0) {
            table.appendChild(row);
            row = document.createElement('tr');
        }
    }
    
    // Add the last row if it has cells
    if (row.children.length > 0) {
        table.appendChild(row);
    }
    
    // 5. Show the calendar
    document.body.appendChild(table);
    
    return table;
}

// Test it
createCalendar(2012, 9); // September 2012