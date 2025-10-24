quotes =[
{
    id:0,
    author:"MalcomX",
    quote:"The future belongs to those who prepare for it today."
},
{
    id:1,
    author:"Oscar Wilde",
    quote:"Be yourself; everyone else is already taken."
},
{
    id:2,
    author:"Mahatma Gandhi",
    quote:"Be the change that you wish to see in the world."
},
{
    id:3,
    author:"Andre Gide",
    quote:"It is better to be hated for what you are than to be loved for what you are not."
},
{
    id:4,
    author:"المتنبي",
    quote:"ما كل ما يتمنى المرء يدركه، تجري الرياح بما لا تشتهي السفن"
}


]


const btn = document.querySelector("#btn");
const disQ = document.querySelector("#quote");
let currentIndex = 0;


btn.addEventListener("click",function(){

        if(currentIndex<quotes.length){
             disQ.innerHTML=`
                   <h4>"${quotes[currentIndex].quote}"</h4>
                   <h3>${quotes[currentIndex].author}</h3>

  `
                currentIndex++;

        }else{
            currentIndex = 0;
            disQ.innerHTML=`
                   <h4>"${quotes[currentIndex].quote}"</h4>
                   <h3>${quotes[currentIndex].author}</h3>

  `
                currentIndex++;
        }
  
    

})
