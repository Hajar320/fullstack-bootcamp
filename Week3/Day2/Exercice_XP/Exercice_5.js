
document.addEventListener('DOMContentLoaded', function() {
    
// Retrieve the div and console.log it

let div = document.querySelector("div");
console.log(div);

//Change the name “Pete” to “Richard”.

let el = document.getElementsByTagName("li")[1];
      el.innerHTML = "Richard";

//Delete the second <li> of the second <ul>

let ul2 = document.getElementsByTagName("ul")[1];
let li2 = ul2.children[1];

console.log(ul2);
console.log(li2);

li2.parentNode.removeChild(li2);

// Change the name of the first <li> of each <ul> to your name.

let allUl = document.querySelectorAll("ul");
    console.log(allUl);

    allUl.forEach(allUl =>{
    let firstLi = allUl.querySelector("li");
     firstLi.innerHTML = "Hajar";
    }
)

// Add a class called student_list to both of the <ul>'s.


    allUl.forEach(allUl =>{
    allUl.classList.add("student_list");
    })

// Add the classes university and attendance to the first <ul>.

let aUl = document.querySelector("ul");

aUl.classList.add("university" ,"attendance");

// Add a “light blue” background color and some padding to the <div>.

let divElem = document.getElementsByTagName("div")[0];
console.log(divElem)
divElem.style.backgroundColor = 'lightblue';
divElem.style.padding = '20px';

// Do not display the <li> that contains the text node “Dan”. (the last <li> of the first <ul>).

let li = document.querySelectorAll("li");

li.forEach(lii => {
    if(lii.textContent.trim() === "Dan") {
        lii.style.display = "none"; // This hides Dan
    } else {
        console.log(lii); // This logs all others
    }
});


// Add a border to the <li> that contains the text node “Richard”. (the second <li> of the <ul>)
let li1 = li[1];
console.log(li1)
li1.style.border = "2px solid black"
// Change the font size of the whole body.

document.body.style.fontSize ="20px";

// Bonus: If the background color of the div is “light blue”, alert “Hello x and y” (x and y are the users in the div)


////// Use getComputedStyle to check actual background color
const bgColor = getComputedStyle(div).backgroundColor;

if (bgColor === "rgba(173, 216, 230)" || bgColor === "lightblue") {
    const names = [];
    
    // Select all UL elements (you need to define this)
    const allUls = document.querySelectorAll("ul");
    
    allUls.forEach(ul => {
        const firstLi = ul.querySelector("li");
        if (firstLi && getComputedStyle(firstLi).display !== "none") {
            names.push(firstLi.textContent.trim());
        }
    });
    
    alert("Hello " + names.join(" and "));
}

//console.log(bgColor)

})