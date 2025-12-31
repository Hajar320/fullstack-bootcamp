type User = {
  type: "user";
  name: string;
  age: number;
};

type Product = {
  type: "product";
  id: number;
  price: number;
};

type Order = {
  type: "order";
  orderId: string;
  amount: number;
};
function handleData(items: (User | Product | Order)[]): string[] {
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
const data: (User | Product | Order)[] = [
  { type: "user", name: "Alice", age: 30 },
  { type: "product", id: 101, price: 49.99 },
  { type: "order", orderId: "ORD123", amount: 150 },
];

const results = handleData(data);

console.log(results.join("\n"));
