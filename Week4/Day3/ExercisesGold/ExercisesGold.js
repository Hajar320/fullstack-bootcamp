 //============================================
 // Exercise 1
//==============================================


function printFullName(objUser){

    const { first, last }=objUser;
   console.log(`Your full name is ${first} ${last}`) ;
}

printFullName({first: 'Elie', last:'Schoppik'});

 //============================================
 // Exercise 2
//==============================================

function keysAndValues(obj) {
    // Get keys and sort them alphabetically
    const sortedKeys = Object.keys(obj).sort();
    
    // Get values in the same order as sorted keys
    const sortedValues = sortedKeys.map(key => obj[key]);
    
    return [sortedKeys, sortedValues];
}

console.log(keysAndValues({ a: 1, b: 2, c: 3 }));
// [["a", "b", "c"], [1, 2, 3]]

console.log(keysAndValues({ a: "Apple", b: "Microsoft", c: "Google" }));
// [["a", "b", "c"], ["Apple", "Microsoft", "Google"]]

console.log(keysAndValues({ key1: true, key2: false, key3: undefined }));
// [["key1", "key2", "key3"], [true, false, undefined]]

// Test with unsorted keys
console.log(keysAndValues({ z: 3, a: 1, m: 2 }));
// [["a", "m", "z"], [1, 2, 3]]



 //============================================
 // Exercise 3
//==============================================

class Counter {
  constructor() {
    this.count = 0;  // Each new Counter starts at 0
  }

  increment() {
    this.count++;
  }
}

// Step 1: Create first counter
const counterOne = new Counter();  // counterOne.count = 0

// Step 2: Increment counterOne twice
counterOne.increment();  // counterOne.count = 1
counterOne.increment();  // counterOne.count = 2

// Step 3: Assign counterOne to counterTwo
const counterTwo = counterOne;  // Both variables reference the SAME object

// Step 4: Increment counterTwo
counterTwo.increment();  // This modifies the shared object =>  3

// Step 5: Check counterOne.count
console.log(counterOne.count);  //   3