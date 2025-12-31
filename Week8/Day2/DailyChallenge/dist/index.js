"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateUnionType(value, allowedTypes) {
    for (const type of allowedTypes) {
        if (typeof value === type) {
            return true;
        }
    }
    return false;
}
// Example usage:
console.log(validateUnionType(42, ["string", "number"])); // true
console.log(validateUnionType("hello", ["boolean", "number"])); // false
console.log(validateUnionType(true, ["string", "boolean"])); // true
//# sourceMappingURL=index.js.map