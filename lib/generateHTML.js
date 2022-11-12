const path = require("path");
const fs = require("fs");
const srcDir = path.resolve(__dirname, "../src");

const create = (employees) => {
  const html = [];

  html.push(
    ...employees
      .filter((employee) => employee.getRole() === "Manager")
      .map((manager) => createManager(manager))
  );
  html.push(
    ...employees
      .filter((employee) => employee.getRole() === "Engineer")
      .map((engineer) => createEngineer(engineer))
  );
  html.push(
    ...employees
      .filter((employee) => employee.getRole() === "Intern")
      .map((intern) => createIntern(intern))
  );

  return createMain(html.join(""));
};

const createManager = (manager) => {
  let src = fs.readFileSync(path.resolve(srcDir, "manager.html"), "utf8");
  src = replacePlaceholders(src, "name", manager.getName());
  src = replacePlaceholders(src, "role", manager.getRole());
  src = replacePlaceholders(src, "email", manager.getEmail());
  src = replacePlaceholders(src, "id", manager.getId());
  src = replacePlaceholders(src, "officeNumber", manager.getOfficeNumber());
  return src;
};

const createEngineer = (engineer) => {
  let src = fs.readFileSync(path.resolve(srcDir, "engineer.html"), "utf8");
  src = replacePlaceholders(src, "name", engineer.getName());
  src = replacePlaceholders(src, "role", engineer.getRole());
  src = replacePlaceholders(src, "email", engineer.getEmail());
  src = replacePlaceholders(src, "id", engineer.getId());
  src = replacePlaceholders(src, "github", engineer.getGithub());
  return src;
};

const createIntern = (intern) => {
  let src = fs.readFileSync(path.resolve(srcDir, "intern.html"), "utf8");
  src = replacePlaceholders(src, "name", intern.getName());
  src = replacePlaceholders(src, "role", intern.getRole());
  src = replacePlaceholders(src, "email", intern.getEmail());
  src = replacePlaceholders(src, "id", intern.getId());
  src = replacePlaceholders(src, "school", intern.getSchool());
  return src;
};

const createMain = (html) => {
  const src = fs.readFileSync(path.resolve(srcDir, "index.html"), "utf8");

  return replacePlaceholders(src, "index", html);
};

const replacePlaceholders = (src, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return src.replace(pattern, value);
};

module.exports = create;
