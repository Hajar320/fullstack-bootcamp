
function allTruthy(...args) {
    return args.every(Boolean);
}

// Or more explicitly:
function allTruthy(...args) {
    return args.every(arg => Boolean(arg));
}


console.log(allTruthy(true, true, true)); // ➞ true
console.log(allTruthy(true, false, true)); // ➞ false
console.log(allTruthy(5, 4, 3, 2, 1, 0)); // ➞ false
console.log(allTruthy(1, "hello", [], {})); // ➞ true
console.log(allTruthy(1, "hello", [], {}, 0)); // ➞ false