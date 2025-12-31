function sumNumbersInArray(arr: (number | string)[]) {
  let sum = 0;
  for (const item of arr) {
    if (typeof item === "number") {
      sum += item;
    }
  }
  return sum;
}

console.log(sumNumbersInArray([1, "hello", 3, "world", 5])); // Output: 9
console.log(sumNumbersInArray(["a", "b", "c"])); // Output: 0
console.log(sumNumbersInArray([10, 20, 30])); // Output: 60
