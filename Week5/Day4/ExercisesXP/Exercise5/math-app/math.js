

function ADD(a,b){
   let add = a+b;
   return add;
   
}

function MULT(a,b){
   let mult= a*b;
   return mult;
}

  // Simple utilities
function isEven(num){if(num % 2 === 0){console.log("EVEN")}}
function  isOdd(num){if(num % 2 !== 0){console.log("ODD")}}

module.exports ={ADD,MULT,isEven,isOdd}