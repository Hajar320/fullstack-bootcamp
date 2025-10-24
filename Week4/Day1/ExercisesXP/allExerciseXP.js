
  //==================================================
 // Exercise 1
//==================================================
/*
// #1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}

// Prediction for #1.1: "inside the funcOne function 3"
// Explanation: 
// - 'a' is declared with let inside the function (function scope)
// - Initial value is 5
// - The if condition (5 > 1) is true, so 'a' gets reassigned to 3
// - The alert shows the final value of 3

// #1.2 If declared with const: 
// - Would throw a TypeError: Assignment to constant variable
// - Cannot reassign a const variable after initialization

// #2
let a = 0;
function funcTwo() {
    a = 5;
}

function funcThree() {
    alert(`inside the funcThree function ${a}`);
}

// Prediction for #2.1:
// First funcThree(): "inside the funcThree function 0"
// funcTwo(): (no output, but sets global a to 5)
// Second funcThree(): "inside the funcThree function 5"
// Explanation:
// - 'a' is declared in global scope
// - funcThree alerts the current global 'a' value
// - funcTwo modifies the global 'a' from 0 to 5
// - Second funcThree call sees the updated global value

// #2.2 If declared with const:
// - Would throw a TypeError: Assignment to constant variable
// - funcTwo() cannot reassign a const variable

// #3
function funcFour() {
    window.a = "hello";
}

function funcFive() {
    alert(`inside the funcFive function ${a}`);
}

// Prediction for #3.1:
// funcFour(): (no output, but sets window.a to "hello")
// funcFive(): "inside the funcFive function hello"
// Explanation:
// - funcFour explicitly sets a property on the global window object
// - funcFive accesses the global variable 'a' which now exists on window
// - In browsers, global variables become properties of the window object

// #4
let a = 1;
function funcSix() {
    let a = "test";
    alert(`inside the funcSix function ${a}`);
}

// Prediction for #4.1: "inside the funcSix function test"
// Explanation:
// - There are two separate 'a' variables with different scopes
// - Global 'a' = 1 (global scope)
// - Local 'a' = "test" (function scope)
// - funcSix uses its own local 'a' due to scope precedence

// #4.2 If declared with const:
// - Same behavior as with let
// - const and let have identical scoping rules, only differ in reassignment

// #5
let a = 2;
if (true) {
    let a = 5;
    alert(`in the if block ${a}`);
}
alert(`outside of the if block ${a}`);

// Prediction for #5.1:
// First alert: "in the if block 5"
// Second alert: "outside of the if block 2"
// Explanation:
// - Two separate 'a' variables with block scope
// - if block 'a' = 5 (block scope)
// - Global 'a' = 2 (global scope)
// - Each alert uses the 'a' from its respective scope

// #5.2 If declared with const:
// - Same behavior as with let
// - const and let both have block scope, so the scoping behavior is identical


  //==================================================
 // Exercise 2
//==================================================

function winBattle(){
    return true;
}

// Transform winBattle() to an arrow function
//const winBattle = () => true;

// Create variable called experiencePoints
// Assign using ternary operator
const experiencePoints = winBattle() ? 10 : 1;

// Console.log the experiencePoints variable
console.log(experiencePoints);

  //==================================================
 // Exercise 3
//==================================================

const isString = (value) => {
    return typeof value === 'string';
};


console.log(isString('hello')); 
//true
console.log(isString([1, 2, 4, 0]));
//false


  //==================================================
 // Exercise 4
//==================================================


const sum = (a,b) => a+b;
// examples:

console.log(sum(5, 3));     // 8
console.log(sum(10, -2));   // 8
console.log(sum(0, 0));     //0



  //==================================================
 // Exercise 5
//==================================================

// Function Declaration
function kgToGramsDeclaration(kg) {
    return kg * 1000;
}
console.log(kgToGramsDeclaration(5)); // 5000

// Function Expression
const kgToGramsExpression = function(kg) {
    return kg * 1000;
};
console.log(kgToGramsExpression(3)); // 3000

// The difference between function declaration and function expression 
// is that function declarations are hoisted and can be called before they're defined,
//  while function expressions are not hoisted and must be defined before they're called.

// One Line Arrow Function
const kgToGramsArrow = kg => kg * 1000;
console.log(kgToGramsArrow(2.5)); // 2500

  //==================================================
 // Exercise 6
//==================================================


(function(numberOfChildren, partnerName, geographicLocation, jobTitle) {
    
    const sentence = `You will be a ${jobTitle} in ${geographicLocation}, and married to ${partnerName} with ${numberOfChildren} kids.`;
   
    document.body.innerHTML = `<p>${sentence}</p>`;

})(2, "marry", "london", "Web Developer");



*/
  //==================================================
 // Exercise 7
//==================================================

(function(userName) {
    const navbar = document.querySelector("#navbar");
    
    // Create user profile div
    const userProfileDiv = document.createElement('div');
    userProfileDiv.style.cssText = 'display: flex; align-items: center; gap: 10px; color: white;';
    
    // Create profile picture - URL FIXED
    const profilePic = document.createElement('img');
    profilePic.style.cssText = 'width: 40px; height: 40px; border-radius: 50%;';
    profilePic.src = `https://i.pravatar.cc/150?u=${userName}`;
    profilePic.alt = `${userName}'s profile picture`;
    
    // Create welcome text
    const welcomeText = document.createElement('span');
    welcomeText.textContent = `Welcome, ${userName}!`;

     // Style navbar
    navbar.style.cssText = 'background-color: #333; padding: 1rem; display: flex; justify-content: space-between;';
            
    // Assemble everything
    userProfileDiv.appendChild(profilePic);
    userProfileDiv.appendChild(welcomeText);
    navbar.appendChild(userProfileDiv);
    
})("John");

  //==================================================
 // Exercise 8
//==================================================

// part 1

// Outer function
function makeJuice(size) {
    // Inner function
    function addIngredients(ing1, ing2, ing3) {
        // Display sentence on DOM
        const sentence = `The client wants a ${size} juice, containing ${ing1}, ${ing2}, ${ing3}`;
        
        // Create and append to DOM
        const div = document.createElement('div');
        div.textContent = sentence;
        document.body.appendChild(div);
        
        console.log(sentence); // Also log to console
    }
    
    // Invoke inner function ONCE inside outer function
    addIngredients("apple", "orange", "carrot");
}

// Invoke outer function in global scope
makeJuice("large");
/*
// part 2

function makeJuice(size) {
    // Create empty array named ingredients
    let ingredients = [];
    
    // Inner function to add ingredients
    function addIngredients(ing1, ing2, ing3) {
        // Push the 3 ingredients into the ingredients array
        ingredients.push(ing1, ing2, ing3);
        console.log(`Added ingredients: ${ing1}, ${ing2}, ${ing3}`);
    }
    
    // New inner function to display the juice
    function displayJuice() {
        // Create the sentence
        const sentence = `The client wants a ${size} juice, containing ${ingredients.join(', ')}`;
        
        // Display on DOM
        const div = document.createElement('div');
        div.textContent = sentence;
        document.body.appendChild(div);
        
        console.log(sentence);
    }
    
    // Invoke addIngredients function TWICE (6 ingredients total)
    addIngredients("apple", "orange", "carrot");
    addIngredients("ginger", "spinach", "lemon");
    
    // Invoke displayJuice function ONCE
    displayJuice();
}

// Invoke makeJuice function in global scope
makeJuice("large");*/