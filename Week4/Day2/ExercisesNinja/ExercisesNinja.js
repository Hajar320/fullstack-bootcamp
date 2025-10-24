  //==============================================
 //Exercise 1
//==============================================

const data = [
  {
    name: 'Butters',
    age: 3,
    type: 'dog'
  },
   {
    name: 'Cuty',
    age: 5,
    type: 'rabbit'
  },
  {
    name: 'Lizzy',
    age: 6,
    type: 'dog'
  },
  {
    name: 'Red',
    age: 1,
    type: 'cat'
  },
  {
    name: 'Joey',
    age: 3,
    type: 'dog'
  },
  {
    name: 'Rex',
    age: 10,
    type: 'dog'
  },
];


let sumDogAgesHumanYears = 0;

for (let i = 0; i < data.length; i++) {
  if (data[i].type === 'dog') {
    sumDogAgesHumanYears += data[i].age * 7;
  }
}

console.log(sumDogAgesHumanYears); // 154

// Using reduce() method

const sumDogAgesHumanYears = data.reduce((total, animal) => {
  if (animal.type === 'dog') {
    return total + (animal.age * 7);
  }
  return total;
}, 0);

console.log(sumDogAgesHumanYears); // 154

  //==============================================
 //Exercise 2
//==============================================


const userEmail3 = ' cannotfillemailformcorrectly@gmail.com '

const cleanEmail = userEmail3.replace(/\s/g, '');
console.log(cleanEmail); // 'cannotfillemailformcorrectly@gmail.com'


  //==============================================
 //Exercise 3
//==============================================


const users = [{ firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
             { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
             { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
             { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
             { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
             { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
             { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}];



// Step one: create an empty object
const usersObject = {};

// Step two: transform the array into the desired structure
users.forEach(user => {
    const fullName = `${user.firstName} ${user.lastName}`;
    usersObject[fullName] = user.role;
});

console.log(usersObject);


  //==============================================
 //Exercise 4
//==============================================

const letters = ['x', 'y', 'z', 'z'];

// using a for loop

const letterCount = {};

for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    if (letterCount[letter]) {
        letterCount[letter]++;
    } else {
        letterCount[letter] = 1;
    }
}

console.log(letterCount); // { x: 1, y: 1, z: 2 }

// Solution 2: Using reduce() method

const letterCount = letters.reduce((acc, letter) => {
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
}, {});

console.log(letterCount); // { x: 1, y: 1, z: 2 }