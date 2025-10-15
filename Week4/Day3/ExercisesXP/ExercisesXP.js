  //===============================================
 // Exercise1
//================================================

const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
}

const {name, location: {country, city, coordinates: [lat, lng]}} = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);

// the output : I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)

  //===============================================
 // Exercise2
//================================================

function displayStudentInfo(objUser){

    const { first, last }=objUser;
   console.log(`Your full name is ${first} ${last}`) ;
}

displayStudentInfo({first: 'Elie', last:'Schoppik'});

//output : 'Your full name is Elie Schoppik'

  //===============================================
 // Exercise3
//================================================


const users = { user1: 18273, user2: 92833, user3: 90315 }


// 1  Using Object.entries()
const usersArray = Object.entries(users);
console.log(usersArray);


// 2  Using map() to modify the array
const modifiedArray = Object.entries(users).map(([username, id]) => [username, id * 2]);
console.log(modifiedArray);
// Output: [ ['user1', 36546], ['user2', 185666], ['user3', 180630] ]


  //===============================================
 // Exercise4
//================================================

class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member);

// Prediction: "object"
// new Person() creates an instance object of the Person class
//In JavaScript, class instances are objects
// The typeof operator returns "object" for all objects (except null which is a historical bug)


  //===============================================
 // Exercise5
//================================================

class Dog {
  constructor(name) {
    this.name = name;
  }
};

  // 2 correct 
class Labrador extends Dog {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
};

// Calls super(name) to initialize the parent class with the name
// Then sets the Labrador-specific size property
// Follows the rule: super() must be called before this


  //===============================================
 // Exercise 6
//================================================

// 1 

// Objects/Arrays (compared by reference):

//  [2] === [2]   false 

// [2] and [2] create two different array objects in memory
// === compares references (memory addresses), not content
// Even though they have the same content, they are different objects

// {} === {}   False 

// {} and {} create two different object instances in memory
// === compares object references, not content
// Empty objects are still different objects in memory


// 2

const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5};

object1.number = 4;
console.log(object2.number) // 4
console.log(object3.number) // 4
console.log(object4.number) // 5

//object2.number = 4
//object2 references the same object as object1

//Changing object1.number affects object2.number

//object3.number = 4
//object3 references the same object as object2 (which references object1)

//All three variables point to the same object in memory

//object4.number = 5
//object4 is a completely separate object

//Created with { number: 5 } - new memory allocation
//Not affected by changes to object1


// 3

class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

class Mammal extends Animal {
  constructor(name, type, color) {
    super(name, type, color);
  }
  
  sound(sound) {
    return `${sound} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
  }
}

const farmerCow = new Mammal('Lily', 'cow', 'brown and white');
console.log(farmerCow.sound('Moooo'));