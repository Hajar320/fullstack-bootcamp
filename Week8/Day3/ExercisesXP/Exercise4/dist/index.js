"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Calculator {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
}
const sum = Calculator.add(10, 5);
const difference = Calculator.subtract(10, 5);
console.log(sum); // 15
console.log(difference); // 5
//# sourceMappingURL=index.js.map