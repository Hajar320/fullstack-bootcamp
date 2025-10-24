

function returnNumbers(string){

    return console.log("Numbers only :",string.replace(/\D/g, ''));

}

module.exports = returnNumbers
