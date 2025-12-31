"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getProperty(obj, key) {
    return obj[key];
}
const product = {
    title: "Laptop",
    price: 1200,
    inStock: true,
};
console.log(getProperty(product, "title")); // "Laptop"
console.log(getProperty(product, "price")); // 1200
console.log(getProperty(product, "inStock")); // true
//# sourceMappingURL=index.js.map