   //=====================================
  //Exercise 1
 //======================================

 let landscape = function() {

 let result = "";

 let flat = function(x) {
   for(let count = 0; count<x; count++){
     result = result + "_";
   }
 }

 let mountain = function(x) {
   result = result + "/"
   for(let counter = 0; counter<x; counter++){
     result = result + "'"
   }
   result = result + "\\"
 }

 flat(4);
 mountain(4);
 flat(4)

 return result;
}

landscape()

//   my prediction : 

//flat(4) → adds 4 underscores: "____"
//mountain(4) → Adds / → "____/"
// Adds 4 single quotes (') → "____/''''"
// Adds \\ → "____/''''\\"
// flat(4) → adds 4 more underscores: "____/''''\\____"

//  Nested Arrow Function :

const landscape = () => {
 let result = "";
 
 const flat = (x) => {
   for(let count = 0; count<x; count++){
     result = result + "_";
   }
 }
 
 const mountain = (x) => {
   result = result + "/"
   for(let counter = 0; counter<x; counter++){
     result = result + "'"
   }
   result = result + "\\"
 }
 
 flat(4);
 mountain(4);
 flat(4);
 
 return result;
}


   //=====================================
  //Exercise 2
 //======================================

const addTo = x => y => x + y;
const addToTen = addTo(10);
addToTen(3);

// result : 13

 // This is a curried function that:
 // takes parameter x
 // Returns a new function that takes parameter y
 // The returned function adds x + y

// addTo(10)(3)
// Step 1: addTo(10) returns y => 10 + y
// Step 2: (y => 10 + y)(3) returns 10 + 3 = 13

   //=====================================
  //Exercise 3
 //======================================

const curriedSum = (a) => (b) => a + b
curriedSum(30)(1)

// result : 31 

// curriedSum(30) - Calls the outer function with a = 30
// Returns: (b) => 30 + b (a new function that remembers a = 30)
// (1) - Immediately calls the returned function with b = 1
// Executes: 30 + 1 returns:31


   //=====================================
  //Exercise 4
 //======================================

const curriedSum = (a) => (b) => a + b
const add5 = curriedSum(5)
add5(12)


// result : 17 

// curriedSum(5) - Calls the outer function with a = 5
// Returns: (b) => 5 + b (a new function that "remembers" a = 5 due to closure)
// add5 now becomes the function: (b) => 5 + b
// add5(12) - Calls this function with b = 12
// Executes: 5 + 12  Returns: 17



   //=====================================
  //Exercise 5
 //======================================

const compose = (f, g) => (a) => f(g(a));
const add1 = (num) => num + 1;
const add5 = (num) => num + 5;
compose(add1, add5)(10)


// result : 16 

// compose(add1, add5) - Creates a new function where:
// f = add1
// g = add5
// Returns: (a) => add1(add5(a))
// (10) - Calls this composed function with a = 10
//First executes: add5(10) → 10 + 5 = 15
//Then executes: add1(15) → 15 + 1 = 16