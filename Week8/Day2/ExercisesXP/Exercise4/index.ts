function flow(num: number) {
  if (num > 0) {
    console.log(`this is a positive number :${num}`);
  } else if (num < 0) console.log(`this is a negative number :${num}`);
  else console.log(`this is a ZERO :${num}`);
}

flow(10);
flow(-55);
flow(0);
