"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function welcomeUser(name, greeting = "Hello") {
    return `${greeting}, ${name}!`;
}
console.log(welcomeUser("Alice")); // Output: Hello, Alice!
console.log(welcomeUser("Bob", "Welcome")); // Output: Welcome, Bob!
//# sourceMappingURL=index.js.map