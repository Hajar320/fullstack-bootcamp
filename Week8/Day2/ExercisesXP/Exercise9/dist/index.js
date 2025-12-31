"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}
// Tests
console.log(greet());
console.log(greet("Alice"));
//# sourceMappingURL=index.js.map