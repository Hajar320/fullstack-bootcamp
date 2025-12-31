type Person = {
  name: string;
  age: number;
};

type Job = {
  position: string;
  department: string;
};
type Employee = Person & Job;
function describeEmployee(employee: Employee): string {
  if (employee.position === "Manager") {
    return `${employee.name} is a Manager in the ${employee.department} department.`;
  } else if (employee.position === "Developer") {
    return `${employee.name} is a Developer in the ${employee.department} department.`;
  } else {
    return `${employee.name} works as a ${employee.position} in the ${employee.department} department.`;
  }
}

const emp1: Employee = {
  name: "Alice",
  age: 30,
  position: "Manager",
  department: "HR",
};

const emp2: Employee = {
  name: "Bob",
  age: 25,
  position: "Developer",
  department: "IT",
};

console.log(describeEmployee(emp1)); // Alice is a Manager in the HR department.
console.log(describeEmployee(emp2)); // Bob is a Developer in the IT department.
