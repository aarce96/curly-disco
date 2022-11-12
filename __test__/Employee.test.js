const Employee = require("../lib/Employee");

test("Set name using constructor function", () => {
  const name = "Cristiano Ronaldo";
  const employee = new Employee(name);
  expect(employee.name).toBe(name);
});

test("Set the ID using constructor function", () => {
  const id = "1";
  const employee = new Employee(
    "Cristiano Ronaldo",
    id,
    "cristiano.ronaldo@realmadrid.com"
  );
  expect(employee.id).toBe(id);
});

test("Runn getEmail function to return the email", () => {
  const email = "cristiano.ronaldo@realmadrid.com";
  const employee = new Employee("Cristiano Ronaldo", 1, email);
  expect(employee.getEmail()).toBe(email);
});

test("Runn getRole function to return 'Employee'", () => {
  const role = "Employee";
  const employee = new Employee(
    "Cristiano Ronaldo",
    1,
    "cristiano.ronaldo@realmadrid.com"
  );
  expect(employee.getRole()).toBe(role);
});
