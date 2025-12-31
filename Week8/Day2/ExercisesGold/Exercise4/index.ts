function welcomeUser(name: string, greeting: string = "Hello") {
  return `${greeting}, ${name}!`;
}

console.log(welcomeUser("Alice")); // Output: Hello, Alice!
console.log(welcomeUser("Bob", "Welcome")); // Output: Welcome, Bob!
