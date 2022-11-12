const Engineer = require("../lib/Engineer");

test("Set GitHub username using constructor function", () => {
  const github = "leonskennedy";
  const employee = new Engineer("Leon", 1, "leons.kennedy@re4.com", github);
  expect(employee.github).toBe(github);
});

test("getRole() should return Engineer as a role", () => {
  const role = "Engineer";
  const employee = new Engineer(
    "Leon",
    1,
    "leons.kennedy@re4.com",
    "leonskennedy"
  );
  expect(employee.getRole()).toBe(role);
});
