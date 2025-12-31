"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printUserDetails(user) {
    console.log(`ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    if (user.membershipLevel) {
        console.log(`Membership Level: ${user.membershipLevel}`);
    }
    else {
        console.log("Membership Level: None");
    }
}
const premiumUser = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    membershipLevel: "Gold",
};
printUserDetails(premiumUser);
const regularUser = {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
};
printUserDetails(regularUser);
//# sourceMappingURL=index.js.map