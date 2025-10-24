  //==================================
 // Exercise 1
//======================================

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'foo');
});


Promise.All(promise1,promise2,promise3)
    .then(values => {
    console.log(values); // [3, 42, 'foo']
  })
    .catch(error => {
    console.error('One of the promises rejected:', error);
  });


  //Promise.all is a method that:
  // Takes an array of promises (or any values) as input
  // Returns a single Promise that resolves when ALL input promises have resolved
  // Returns an array of resolved values in the same order as the input promises
  // Immediately rejects if ANY of the input promises rejects

  //==================================
 // Exercise 2
//======================================

function timesTwoAsync(x) {
  return new Promise(resolve => resolve(x * 2));
}

const arr = [1, 2, 3];
const promiseArr = arr.map(timesTwoAsync);

Promise.all(promiseArr)
  .then(result => {
    console.log(result);
  });


// function timesTwoAsync(x) : Creates a promise that immediately resolves with x * 2
//This is an asynchronous version of doubling a number

//const arr = [1, 2, 3] : Creates a simple array [1, 2, 3]
//const promiseArr = arr.map(timesTwoAsync) : Maps over each element and applies timesTwoAsync:

//1 → timesTwoAsync(1) → Promise that resolves to 2
//2 → timesTwoAsync(2) → Promise that resolves to 4
//3 → timesTwoAsync(3) → Promise that resolves to 6

//Result: [Promise(2), Promise(4), Promise(6)]

//Promise.all(promiseArr) Takes the array of 3 promises
//Waits for ALL promises to resolve
//Since all promises resolve immediately, this happens almost instantly
//.then(result => { console.log(result); });

//result contains the resolved values in the same order: [2, 4, 6]
