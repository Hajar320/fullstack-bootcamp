interface HasNumericProperty {
  [key: string]: number;
}

function multiplyProperty<T extends HasNumericProperty>(
  obj: T,
  key: keyof T,
  factor: number
): number {
  return obj[key]! * factor;
}

const item = {
  price: 50,
  quantity: 4,
};

console.log(multiplyProperty(item, "price", 2)); // 100
console.log(multiplyProperty(item, "quantity", 3)); // 12
