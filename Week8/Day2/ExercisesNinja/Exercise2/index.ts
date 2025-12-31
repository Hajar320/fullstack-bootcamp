function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
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
