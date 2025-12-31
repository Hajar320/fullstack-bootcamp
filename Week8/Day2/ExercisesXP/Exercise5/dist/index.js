"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDetails(name, age) {
    let greeting = `hello,${name}! you are ${age} years old.`;
    return [name, age, greeting];
}
const details = getDetails("Alice", 25);
console.log(details);
//# sourceMappingURL=index.js.map