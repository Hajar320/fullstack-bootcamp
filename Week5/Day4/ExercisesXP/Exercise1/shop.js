// shop.js
const products = require('./products.js');

function findProduct(productName) {
  const product = products.find(p => 
    p.name.toLowerCase() === productName.toLowerCase()
  );
  
  if (product) {
    console.log("Product Found:");
    console.log("Name: " + product.name);
    console.log("Price: $" + product.price);
    console.log("Category: " + product.category);
    console.log("ID: " + product.id);
    console.log("----------------------");  } else {
    console.log(` "${productName}" not found`);
  }
  
  return product;
}

console.log("=== Product Search Results ===");
findProduct("Wireless Bluetooth Headphones");
findProduct("Running Shoes");
findProduct("JavaScript Programming Book");
findProduct("Non-Existent Product");