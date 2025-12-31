"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    name;
    salary;
    position;
    department;
    constructor(name, salary, position, department) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }
    getEmployeeInfo() {
        return `Name: ${this.name}, Position: ${this.position}`;
    }
}
const emp = new Employee("Alice", 50000, "Developer", "IT");
console.log(emp.getEmployeeInfo());
// Output: Name: Alice, Position: Developer
//# sourceMappingURL=index.js.map