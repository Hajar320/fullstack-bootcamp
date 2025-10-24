  //==============================
 //Exercise 1
//=======================================

function compareToTen(num) {
    return new Promise((resolve, reject) => {
        if (num <= 10) {
            resolve(`${num} is less than or equal to 10`);
        } else {
            reject(`${num} is greater than 10`);
        }
    });
}
    

// Test case 1: Number <= 10 (Promise resolves)
compareToTen(5)
    .then(result => console.log(result))  // "5 is less than or equal to 10"
    .catch(error => console.error(error));

// Test case 2: Number > 10 (Promise rejects)
compareToTen(15)
    .then(result => console.log(result))
    .catch(error => console.error(error)); // "15 is greater than 10"


  //==============================
 //Exercise 2
//=======================================


const fourSecondPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("success");
    }, 4000);
});


  //==============================
 //Exercise 3
//=======================================

const resolvedPromise = Promise.resolve(3);

// Usage
resolvedPromise
    .then(value => {
        console.log(value); // 3
    })
    .catch(error => {
        console.error(error); // This won't run
    });



const rejectedPromise = Promise.reject("Boo!");

// Usage
rejectedPromise
    .then(value => {
        console.log(value); // This won't run
    })
    .catch(error => {
        console.error(error); // "Boo!"
    });

