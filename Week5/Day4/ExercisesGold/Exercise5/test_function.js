const returnNumbers = require('./extract_numbers.js')



returnNumbers('k5k3q2g5z6x9bn');
returnNumbers("abc123def456");    // Output: "123456"
returnNumbers("hello 123 world"); // Output: "123"
returnNumbers("1a2b3c");          // Output: "123"