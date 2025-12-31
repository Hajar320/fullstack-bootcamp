"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let i;
function processValue(value) {
    if (typeof value === "number") {
        return `$${value.toFixed(2)}`;
    }
    else {
        /* let reversed: string = "";
    
        for (i = value.length - 1; i >= 0; i--) {
          reversed += value[i];
        }*/
        return value.split("").reverse().join("");
    }
}
console.log(processValue(250)); // Output: $25.00
console.log(processValue("Hello World")); // Output: H
//# sourceMappingURL=index.js.map