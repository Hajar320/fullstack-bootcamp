function getDetails(name: string, age: number) {
  let greeting = `hello,${name}! you are ${age} years old.`;
  return [name, age, greeting];
}

const details = getDetails("Alice", 25);
console.log(details);
