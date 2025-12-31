"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    id;
    name;
    price;
    constructor(id, name, price) {
        this.id = id; // ✅ allowed (initialization)
        this.name = name;
        this.price = price;
    }
    getProductInfo() {
        return `Product: ${this.name}, Price: $${this.price}`;
    }
}
const product = new Product(1, "Laptop", 1200);
console.log(product.getProductInfo());
// Output: Product: Laptop, Price: $1200
//# sourceMappingURL=index.js.map