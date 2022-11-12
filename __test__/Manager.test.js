const Manager = require("../lib/Manager");

test("Set office number using constructor function", () => {
  const officeNumber = "1428";
  const employee = new Manager("Freddy", 1, "freddy.k@gmail.com", officeNumber);
  expect(employee.officeNumber).toBe(officeNumber);
});

test("getRole function should return Manager as a role", () => {
  const role = "Manager";
  const employee = new Manager(
    "Freddy",
    1,
    "freddy.k@gmail.com",
    "freddykrueger"
  );
  expect(employee.getRole()).toBe(role);
});
