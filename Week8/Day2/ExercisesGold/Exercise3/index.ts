type AdvancedUser = {
  name: string;
  age: number;
  address?: string;
};

function introduceAdvancedUser(user: AdvancedUser) {
  if (user.address) {
    console.log(
      `Hello, my name is ${user.name}, I am ${user.age} years old and I live at ${user.address}.`
    );
  } else {
    console.log(`Hello, my name is ${user.name}, I am ${user.age} years old.`);
  }
}

introduceAdvancedUser({ name: "Alice", age: 30, address: "123 Main St" });
introduceAdvancedUser({ name: "Bob", age: 25 });
