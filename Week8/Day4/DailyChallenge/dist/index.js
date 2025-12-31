"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleData(items) {
    return items.map((item) => {
        switch (item.type) {
            case "user":
                return `Hello ${item.name}, you are ${item.age} years old.`;
            case "product":
                return `Product ID: ${item.id}, Price: $${item.price}`;
            case "order":
                return `Order ${item.orderId} with amount $${item.amount}`;
            default:
                // Unexpected case
                return "Unknown item type";
        }
    });
}
const data = [
    { type: "user", name: "Alice", age: 30 },
    { type: "product", id: 101, price: 49.99 },
    { type: "order", orderId: "ORD123", amount: 150 },
];
const results = handleData(data);
console.log(results.join("\n"));
//# sourceMappingURL=index.js.map