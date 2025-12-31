"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function describeEmployee(employee) {
    if (employee.position === "Manager") {
        return `${employee.name} is a Manager in the ${employee.department} department.`;
    }
    else if (employee.position === "Developer") {
        return `${employee.name} is a Developer in the ${employee.department} department.`;
    }
    else {
        return `${employee.name} works as a ${employee.position} in the ${employee.department} department.`;
    }
}
const emp1 = {
    name: "Alice",
    age: 30,
    position: "Manager",
    department: "HR",
};
const emp2 = {
    name: "Bob",
    age: 25,
    position: "Developer",
    department: "IT",
};
console.log(describeEmployee(emp1)); // Alice is a Manager in the HR department.
console.log(describeEmployee(emp2)); // Bob is a Developer in the IT department.
//# sourceMappingURL=index.js.map