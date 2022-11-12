const inquirer = require("inquirer");
const path = require("path");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const generateHTML = require("./lib/generateHTML");

const employees = [];

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

function init() {
  inquirer.prompt(questions).then(function (inquirerResponses) {
    if (inquirerResponses.role === "Engineer") {
      inquirer.prompt({
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
      });
    } else if (inquirerResponses.role === "Manager") {
      inquirer.prompt({
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number? (Required)",
      });
    } else if (inquirerResponses.role === "Intern") {
      inquirer.prompt({
        type: "input",
        name: "school",
        message: "What school is the intern from? (Required)",
      });
    }
  });
}

init();
