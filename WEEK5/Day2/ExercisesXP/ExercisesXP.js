  //================================================
 //Exercise 1
//===========================================

async function getdata(){
            
    const giphyUrl ="https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

    try{
        const response = await fetch(giphyUrl);
        if(!response.ok){
           throw new Error(`status : ${response.status}`);
        }
        const data = await response.json();
        return data;
        
        }
    catch(error){
           console.error("fetch error",error);
    }

}

  //================================================
 //Exercise 2
//===========================================

async function getdata(){
            
    const giphyUrlSun ="https://api.giphy.com/v1/gifs/search?q=sun&offset=2&limit=10&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

    try{
        const response = await fetch(giphyUrlSun);
        if(!response.ok){
           throw new Error(`status : ${response.status}`);
        }
        const data = await response.json();
        return data;
        
        }
    catch(error){
           console.error("fetch error",error);
    }

}

  //================================================
 //Exercise 3
//===========================================

async function fetchdata(){

    const swapiUrl ="https://www.swapi.tech/api/starships/9/";

    try{
        const response =await fetch(swapiUrl);
        if(!response.ok){
           throw new Error(`status : ${response.status}`);
        }
        const objectStarWars = await response.json();
        return console.log(objectStarWars.result);
    }
    catch(error){
                   console.error("fetch error",error);
    }
}

  //================================================
 //Exercise 4
//===========================================

function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
    console.log('calling');
    let result = await resolveAfter2Seconds();
    console.log(result);
}

asyncCall();

//Final Output:
    //calling
    //resolved

//Step-by-step Explanation:

      //asyncCall() is invoked
      //console.log('calling') executes immediately → prints "calling"
      //await resolveAfter2Seconds() is called:
      //Returns a Promise that resolves after 2 seconds
      //await pauses the function execution until the Promise resolves
      //JavaScript can do other work during this wait (non-blocking)
      //After 2 seconds, the Promise resolves with value 'resolved'
      //result gets the value 'resolved'
      //console.log(result) executes → prints "resolved"