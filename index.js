const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const fileDirectory = path.resolve(__dirname, "dist");
const filePath = path.join(fileDirectory, "index.html");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const render = require("./lib/generateHTML");

let employees = [];

const questions = [
  {
    type: "input",
    name: "name",
    message: "Please enter name of employee.",
  },
  {
    type: "input",
    name: "id",
    message: "Please enter ID of employee.",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter employee's email.",
  },
  {
    type: "list",
    name: "role",
    message: "Please choose employee's role.",
    choices: ["Engineer", "Intern", "Manager"],
  },
];

managerQuestions = [
  {
    type: "input",
    name: "officeNumber",
    message: "What is the manager's office number? (Required)",
  },
];

engineerQuestions = [
  {
    type: "input",
    name: "github",
    message: "What is the engineer's Github Username? (Required)",
    validate: (githubInput) => {
      if (githubInput) {
        return true;
      } else {
        console.log("Please enter a GitHub username!");
        return false;
      }
    },
  },
];

internQuestions = [
  {
    type: "input",
    name: "school",
    message: "What school is the intern from? (Required)",
  },
];

const newEmployee = () => {
  inquirer.prompt(questions).then((response) => {
    let name = response.name;
    let id = response.id;
    let email = response.email;
    let role = response.role;
    let officeNumber;
    let github;
    let school;

    if (role === "Engineer") {
      inquirer.prompt(engineerQuestions).then((response) => {
        github = response.github;
        let employee = new Engineer(name, id, email, github);
        employees.push(employee);
        createAnother();
      });
    } else if (role === "Manager") {
      inquirer.prompt(managerQuestions).then((response) => {
        officeNumber = response.officeNumber;
        let employee = new Manager(name, id, email, officeNumber);
        employees.push(employee);
        createAnother();
      });
    } else if (role === "Intern") {
      inquirer.prompt(internQuestions).then((response) => {
        school = response.school;
        let employee = new Intern(name, id, email, school);
        employees.push(employee);
        createAnother();
      });
    }
  });
};

function init() {
  createAnother();
}

const createAnother = () => {
  inquirer
    .prompt({
      type: "confirm",
      name: "createAnother",
      message: "Would you like to add an employee?",
    })
    .then(function (data) {
      if (data.createAnother) {
        newEmployee();
      } else {
        const renderHTML = (employees) => {
          fs.writeFile(filePath, render(employees), "utf8", function (err) {
            if (err) {
              return console.log(err);
            }

            console.log("Success!");
          });
        };
        renderHTML();
      }
    });
};

init();
