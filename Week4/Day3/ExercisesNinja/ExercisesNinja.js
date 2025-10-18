class Bird {
  constructor() {
    console.log("I'm a bird. 🦢");
  }
}

class Flamingo extends Bird {
  constructor() {
    console.log("I'm pink. 🌸");
    super();
  }
}

const pet = new Flamingo();

// Flamingo constructor runs first
//console.log("I'm pink. 🌸"); executes immediately
//super() calls the parent Bird constructor
//console.log("I'm a bird. 🦢"); executes

//Important Rule:
//In JavaScript, when you extend a class, you must call super() 
// before using this in the child constructor. 
// However, you can put other code before super() as long as it doesn't use this.