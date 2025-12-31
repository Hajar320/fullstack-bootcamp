function formatInput<T extends { toString(): string }>(input: T): string {
  // Use type assertion to treat input as a string
  const str = input.toString() as string;

  // Example formatting: add brackets around the string
  return `[${str}]`;
}
console.log(formatInput(123)); // [123]
console.log(formatInput("Hello")); // [Hello]
console.log(formatInput(true)); // [true]
console.log(formatInput({ key: "value" })); // [[object Object]]
