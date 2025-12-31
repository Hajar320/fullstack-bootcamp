"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFirstElement(arr) {
    return arr[0];
}
const mixedArray1 = [10, "hello", 20];
const mixedArray2 = ["apple", 42, "banana"];
console.log(getFirstElement(mixedArray1)); // 10 (as string)
console.log(getFirstElement(mixedArray2)); // "apple"
//# sourceMappingURL=index.js.map