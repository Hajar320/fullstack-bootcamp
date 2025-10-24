const prompt =require('prompt-sync')();


function isValidFullName(name) {
    // Combined regex that checks all conditions:
    // - Only letters and one space
    // - First letter of each name is uppercase
    const nameRegex = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
    return nameRegex.test(name);
}
const fullName = prompt('enter your full name : ');

if (isValidFullName(fullName)) {
    console.log('✅ Valid name!');
} else {
    console.log('❌ Invalid name format. Please use: "FirstName LastName"');
    console.log('   - Only letters allowed');
    console.log('   - Exactly one space');
    console.log('   - First letter of each name must be uppercase');
}



    


