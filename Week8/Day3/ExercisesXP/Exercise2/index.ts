class Product {
  readonly id: number;
  public name: string;
  public price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id; // ✅ allowed (initialization)
    this.name = name;
    this.price = price;
  }

  public getProductInfo(): string {
    return `Product: ${this.name}, Price: $${this.price}`;
  }
}

const product = new Product(1, "Laptop", 1200);

console.log(product.getProductInfo());
// Output: Product: Laptop, Price: $1200
