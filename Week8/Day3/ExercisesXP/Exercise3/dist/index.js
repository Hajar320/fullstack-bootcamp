"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Animal {
    name;
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        return "Some sound";
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name); // calls the Animal constructor
    }
    makeSound() {
        return "bark";
    }
}
const myDog = new Dog("Buddy");
console.log(myDog.name); // Buddy
console.log(myDog.makeSound()); // bark
//# sourceMappingURL=index.js.map