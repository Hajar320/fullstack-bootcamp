function describeValue(value: number | string): string {
  if (typeof value === "number") {
    return "This is a number";
  } else {
    return "This is a string";
  }
}
console.log(describeValue(10)); // This is a number
console.log(describeValue("hello")); // This is a string
