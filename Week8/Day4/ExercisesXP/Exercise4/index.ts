function getFirstElement(arr: (number | string)[]): string {
  return arr[0] as string;
}

const mixedArray1 = [10, "hello", 20];
const mixedArray2 = ["apple", 42, "banana"];

console.log(getFirstElement(mixedArray1)); // 10 (as string)
console.log(getFirstElement(mixedArray2)); // "apple"
