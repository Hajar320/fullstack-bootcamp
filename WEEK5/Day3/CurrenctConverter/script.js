//const api_key = b6b41063856c7240f3354100;
//const conversionRate=fetch("https://v6.exchangerate-api.com/v6/b6b41063856c7240f3354100/codes/pair/eur/gbp");
// GET https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP/AMOUNT


async function fetchdata(){
        try{
          const response = await fetch(`https://v6.exchangerate-api.com/v6/b6b41063856c7240f3354100/codes`);
          if(!response.ok){
              throw new Error("error",error);
          }
          const data=await response.json();
          const codes = await data.supported_codes;

                 for(let i=0;i<codes.length;i++){
                    const curr = Object.values(codes[i])[0];
                    const sec1=document.querySelector("#currency1");
                    const sec2=document.querySelector("#currency2");
                    const op1=document.createElement("option")
                          op1.textContent=`${curr}`;
                          sec1.appendChild(op1)   ; 
                    const op2=document.createElement("option")
                          op2.textContent=`${curr}`;     
                          sec2.appendChild(op2)   ;  
          }


        }
        catch(error){
            console.error("error",error.message);
        }

}



const btn =document.querySelector("#convert");

btn.addEventListener("click",function(){
    const sec1=document.querySelector("#currency1");
    const sec2=document.querySelector("#currency2");

    const fromCurr=sec1.value;
    const toCurr=sec2.value;
    const input=document.querySelector("input")
    const amount =input.value;

    async function converted(fromCurr,toCurr,amount){
    try{
        if(!isNaN(amount)){
        const response= await fetch(`https://v6.exchangerate-api.com/v6/b6b41063856c7240f3354100/pair/${fromCurr}/${toCurr}/${amount}`);
        if(!response.ok){
            throw new Error("error",error.status);
        }
        const data = await response.json();
        const res = await data.conversion_result;
        const r=document.querySelector("#converted");
              r.textContent=res;
               }
        else{
        const r=document.querySelector("#cenvR");
              r.textContent="please enter a number";

        }
    }
    catch(error){
        console.error("error",error);
    }

}

converted(fromCurr,toCurr,amount);

})

const switchbtn =document.querySelector("#switch");
switchbtn.addEventListener("click",function(){

    const sec1 = document.querySelector("#currency1");
    const sec2 = document.querySelector("#currency2");
    
    // Swap currencies
    [sec1.value, sec2.value] = [sec2.value, sec1.value];
    
    // Then perform conversion with swapped values
    const fromCurr = sec1.value;
    const toCurr = sec2.value;
    const amount = document.querySelector("input").value;
    
    converted(fromCurr, toCurr, amount);


})












document.addEventListener('DOMContentLoaded', fetchdata);








