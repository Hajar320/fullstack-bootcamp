const axios = require('axios')



async function fetchTitles(){

    try{
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

         if(!response.ok){
        throw new Error("error",Error.message);
        }
         const data =await response.json();

         data.forEach(element => {
            console.log(`
                ${element.id}-${element.title}\n`); 
         });
          
}  
   catch(error){
    console.error("error",error)
   }

}


module.exports = fetchTitles