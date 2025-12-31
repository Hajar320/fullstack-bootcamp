class Calculator {
  static add(a: number, b: number): number {
    return a + b;
  }

  static subtract(a: number, b: number): number {
    return a - b;
  }
}
const sum = Calculator.add(10, 5);
const difference = Calculator.subtract(10, 5);

console.log(sum); // 15
console.log(difference); // 5
