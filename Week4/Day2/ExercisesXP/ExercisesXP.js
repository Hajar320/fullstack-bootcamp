  //=======================================
 // Exercise 1
//=========================================

const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];


// Display colors with numbered choices
colors.forEach((color, index) => {
    console.log(`${index + 1}# choice is ${color}.`);
});

// Check if array contains "Violet"
if (colors.includes("Violet")) {
    console.log("Yeah");
} else {
    console.log("No...");
}

  //=======================================
 // Exercise 2
//=========================================

const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th","st","nd","rd"];


colors.forEach((color, index) => {
    const position = index + 1;
    const suffix = (position % 10 > 3 || (position % 100 >= 11 && position % 100 <= 13)) 
        ? "th" 
        : ordinal[position % 10];
    console.log(`${position}${suffix} choice is ${color}.`);
});



  //=======================================
 // Exercise 3
//=========================================


------1------
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);

// ['bread', 'carrot', 'potato', 'chicken', 'apple', 'orange']


------2------
const country = "USA";
console.log([...country]);

// ['U', 'S', 'A']

------Bonus------
let newArray = [...[,,]];
console.log(newArray);

// [undefined, undefined]


  //=======================================
 // Exercise 4
//=========================================


const users = [{ firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
             { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
             { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
             { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
             { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
             { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
             { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}];



// Using map() to create welcome messages
const welcomeStudents = users.map(user => `Hello ${user.firstName}`);


// Using filter() to get only Full Stack Residents
const fullStackResidents = users.filter(user => user.role === 'Full Stack Resident');

// Chain filter() with map() to get last names of Full Stack Residents
const fullStackLastNames = users
    .filter(user => user.role === 'Full Stack Resident')
    .map(user => user.lastName);



  //=======================================
 // Exercise 5
//=========================================

const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

// Using reduce() to combine into a single string
const result = epic.reduce((accumulator, currentWord) => {
    return accumulator + ' ' + currentWord;
});

  //=======================================
 // Exercise 6
//=========================================

const students = [{name: "Ray", course: "Computer Science", isPassed: true}, 
               {name: "Liam", course: "Computer Science", isPassed: false}, 
               {name: "Jenner", course: "Information Technology", isPassed: true}, 
               {name: "Marco", course: "Robotics", isPassed: true}, 
               {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
               {name: "Jamie", course: "Big Data", isPassed: false}];


// Using filter() to get students who passed
const passedStudents = students.filter(student => student.isPassed);

// Chain filter() with forEach() to congratulate passing students
students
    .filter(student => student.isPassed)
    .forEach(student => {
        console.log(`Good job ${student.name}, you passed the course in ${student.course}`);
    });