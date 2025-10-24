const people =require("./data.js")


function averageAge(){
     let totAge=0;
      
     people.forEach(person => {
        totAge += person.age;
    });


    let average =Math.round(totAge/people.length);
    console.log(` average age : ${average}`)

}

averageAge()

