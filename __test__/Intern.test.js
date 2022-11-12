const Intern = require("../lib/Intern");

test("Set school using constructor function", () => {
  const school = "My Hero Academia";
  const employee = new Intern("Deku", 1, "oneforall@gmail.com", school);
  expect(employee.school).toBe(school);
});

test("getRole function should return Intern as a role", () => {
  const role = "Intern";
  const employee = new Intern(
    "Deku",
    1,
    "oneforall@gmail.com",
    "izukumidoriya"
  );
  expect(employee.getRole()).toBe(role);
});
