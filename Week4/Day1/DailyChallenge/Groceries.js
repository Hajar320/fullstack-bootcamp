let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
}

const displayGroceries = () => {
    groceries.fruits.forEach(fruit => console.log(fruit));
};

// Test the function
displayGroceries();


const cloneGroceries = () => {
    // Create a copy of client variable
    let user = client;
    
    // Change client variable to "Betty"
    client = "Betty";
    
    console.log("Client:", client); // "Betty"
    console.log("User:", user); // "John"
    // Will we see the modification in user? NO
    // Why? Because strings are primitive values and copied by value
    
    // Create a variable equal to groceries
    let shopping = groceries;
    
    // Change totalPrice in shopping object
    shopping.totalPrice = "35$";
    
    console.log("Groceries totalPrice:", groceries.totalPrice); // "35$"
    console.log("Shopping totalPrice:", shopping.totalPrice); // "35$"
    // Will we see the modification? YES
    // Why? Because objects are copied by reference
    
    // Change paid key in shopping object
    shopping.other.paid = false;
    
    console.log("Groceries paid:", groceries.other.paid); // false
    console.log("Shopping paid:", shopping.other.paid); // false
    // Will we see the modification? YES
    // Why? Because we're modifying the same object in memory
};

// invoke the function
cloneGroceries();