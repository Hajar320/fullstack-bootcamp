const { faker } = require('@faker-js/faker');
const prompt = require('prompt-sync')();

let users=[]

function addUser(){
    const newUser=  {
    name: faker.person.fullName(),
    address: {
      street: faker.location.streetAddress(),
      country: faker.location.country()
    }
  };
  users.push(newUser)
  console.log(' Fake user added:',newUser.name);
}


function promptUser(){
    console.log('\n--- Add a New User ---');
    const name = prompt('Enter name: ');
    const street = prompt('Enter street address: ');
    const country = prompt('Enter country: ');
    
    const realUser = {
        name: name,
        address: {
            street: street,
            country: country
        }
    };
    
    users.push(realUser);

}

function displayUsers() {
    console.log('\n--- All Users ---');
    if (users.length === 0) {
        console.log('No users in the array.');
    } else {
        users.forEach((user, index) => {
            console.log(`${index + 1}. Name: ${user.name}`);
            console.log(`   Street: ${user.address.street}`);
            console.log(`   Country: ${user.address.country}`);
            console.log('   ---');
        });
    }
}
   
addUser()
promptUser()
displayUsers()
