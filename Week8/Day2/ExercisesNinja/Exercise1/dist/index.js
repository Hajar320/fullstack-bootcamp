"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Step 2: Implement the Function
function mapType(value) {
    if (typeof value === "number") {
        // Input is a number: return square
        return (value * value);
    }
    else {
        // Input is a string: return length
        return value.length;
    }
}
// Step 3: Test the Function
console.log("Testing mapType function:");
console.log("========================");
// Test with numbers
const numResult1 = mapType(5); // Should return 25
const numResult2 = mapType(10); // Should return 100
const numResult3 = mapType(3.5); // Should return 12.25
console.log(`mapType(5) = ${numResult1}, Type: ${typeof numResult1}`);
console.log(`mapType(10) = ${numResult2}, Type: ${typeof numResult2}`);
console.log(`mapType(3.5) = ${numResult3}, Type: ${typeof numResult3}`);
// Test with strings
const strResult1 = mapType("hello"); // Should return 5
const strResult2 = mapType("TypeScript"); // Should return 10
const strResult3 = mapType(""); // Should return 0
console.log(`\nmapType("hello") = ${strResult1}, Type: ${typeof strResult1}`);
console.log(`mapType("TypeScript") = ${strResult2}, Type: ${typeof strResult2}`);
console.log(`mapType("") = ${strResult3}, Type: ${typeof strResult3}`);
//# sourceMappingURL=index.js.map