"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function multiplyProperty(obj, key, factor) {
    return obj[key] * factor;
}
const item = {
    price: 50,
    quantity: 4,
};
console.log(multiplyProperty(item, "price", 2)); // 100
console.log(multiplyProperty(item, "quantity", 3)); // 12
//# sourceMappingURL=index.js.map