const {ADD,MULT,isOdd,isEven} = require('./math.js');
const _ =require('lodash')



console.log('\n1. USING CUSTOM MATH MODULE:');
console.log('============================');

console.log(`Addition :`,ADD(4,5));
console.log(`Multiplication :` ,MULT(4,5));
const numbers = [10, 5, 8, 20, 3, 15];
console.log('\n2. USING LODASH UTILITIES:');
console.log('==========================');
console.log('Numbers:', numbers);
console.log('Sum:', _.sum(numbers));
console.log('Average:', _.mean(numbers)); // mean = average
console.log('Maximum:', _.max(numbers));
console.log('Minimum:', _.min(numbers));