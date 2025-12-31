interface HasLength {
  length: number;
}
function logLength<T extends HasLength>(value: T): void {
  console.log(`Length: ${value.length}`);
}
logLength("Hello TypeScript"); // Length: 16
logLength([1, 2, 3, 4]); // Length: 4
logLength({ length: 10, value: "Test" }); // Length: 10
