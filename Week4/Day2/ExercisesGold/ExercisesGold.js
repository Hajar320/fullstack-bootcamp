  //==============================================
 // Exercise 1
//==============================================

[1, 2, 3].map(num => {
  if (typeof num === 'number') return num * 2;
  return ;
});

// For each element in the array [1, 2, 3]:

// First iteration: num = 1
// typeof 1 === 'number' → true
// return 1 * 2 → 2

// Second iteration: num = 2  
// typeof 2 === 'number' → true
// return 2 * 2 → 4

// Third iteration: num = 3
// typeof 3 === 'number' → true
// return 3 * 2 → 6

// Final result: [2, 4, 6]

  //==============================================
 // Exercise 2
//==============================================

[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);

// Step 0: acc = [1, 2] (initial value)
// Step 1: acc.concat([0, 1]) → [1, 2, 0, 1]
// Step 2: acc.concat([2, 3]) → [1, 2, 0, 1, 2, 3]
//Final result :[1, 2, 0, 1, 2, 3]


  //==============================================
 // Exercise 3
//==============================================

const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
    console.log(num, i);
    alert(num);
    return num * 2;
})

//i is the second parameter of the map callback function
// It represents the current index of the element being processed
// Indexes start at 0 and increment for each element

// console.log(num, i);  This will show:
    // 1, 0
    // 2, 1  
    // 4, 2
    // 5, 3
    // 8, 4
    // 9, 5


  //==============================================
 // Exercise 4
//==============================================

// 1 
const array = [[1],[2],[3],[[[4]]],[[[5]]]]
const modifiedArray = array.flat(2);
console.log(modifiedArray); // [1, 2, 3, [4], [5]]

//2
const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
const modifiedGreeting = greeting.map(phrase => phrase.join(' '));
console.log(modifiedGreeting); // ["Hello young grasshopper!", "you are", "learning fast!"]

//3
const greetingString = greeting.flat().join(' ');
// This gives: "Hello young grasshopper! you are learning fast!"

//4
const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]]
const result = trapped.flat(Infinity);
console.log(result); // [3]