class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public makeSound(): string {
    return "Some sound";
  }
}
class Dog extends Animal {
  constructor(name: string) {
    super(name); // calls the Animal constructor
  }

  public makeSound(): string {
    return "bark";
  }
}

const myDog = new Dog("Buddy");

console.log(myDog.name); // Buddy
console.log(myDog.makeSound()); // bark
