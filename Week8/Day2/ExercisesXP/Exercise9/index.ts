function greet(): string;
function greet(name: string): string;

function greet(name: string = "Guest"): string {
  return `Hello, ${name}!`;
}

// Tests
console.log(greet());
console.log(greet("Alice"));
