const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");

const fileDirectory = path.resolve(__dirname, "dist");
const filePath = path.join(fileDirectory, "index.html");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const renderHTML = require("./lib/generateHTML");

let employeesArr = [];

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

engineerQuestions = [
  {
    type: "input",
    name: "github",
    message: "What is the engineer's Github Username? (Required)",
    validate: (github) => {
      if (github) {
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
    validate: (school) => {
      if (school) {
        return true;
      } else {
        console.log("Please enter a school name!");
        return false;
      }
    },
  },
];

managerQuestions = [
  {
    type: "input",
    name: "officeNumber",
    message: "What is the manager's office number? (Required)",
    validate: (officeNumber) => {
      if (officeNumber) {
        return true;
      } else {
        console.log("Please enter an office number!");
        return false;
      }
    },
  },
];

const init = () => {
  if (fs.existsSync(filePath)) {
    inquirer
      .prompt({
        type: "confirm",
        message: "Do you want to overwrite file found in dist folder?",
        name: "overwrite",
      })
      .then(async (response) => {
        let overwrite = response.overwrite;
        if ((await overwrite) === true) {
          console.log("Please enter your team information:");
          newEmployee();
        } else if ((await overwrite) === false) {
          console.log(
            "The index file found in the dist folder cannot be overwritten. Please move the current file out before restarting program."
          );
        }
      });
  } else {
    console.log(
      "This is a Team Profile Generator. Please enter your team's information below:"
    );
    newEmployee();
  }
};

const newEmployee = async () => {
  await inquirer.prompt(questions).then((response) => {
    let name = response.name;
    let id = response.id;
    let email = response.email;
    let role = response.role;
    let github;
    let school;
    let officeNumber;

    if (role === "Engineer") {
      inquirer.prompt(engineerQuestions).then((response) => {
        github = response.github;
        let employee = new Engineer(name, id, email, github);
        employeesArr.push(employee);
        addEmployee(employeesArr);
      });
    } else if (role === "Intern") {
      inquirer.prompt(internQuestions).then((response) => {
        school = response.school;
        let employee = new Intern(name, id, email, school);
        employeesArr.push(employee);
        addEmployee(employeesArr);
      });
    } else if (role === "Manager") {
      inquirer.prompt(managerQuestions).then((response) => {
        officeNumber = response.officeNumber;
        let employee = new Manager(name, id, email, officeNumber);
        employeesArr.push(employee);
        addEmployee(employeesArr);
      });
    }
  });
};

const addEmployee = async (array) => {
  await inquirer
    .prompt({
      type: "confirm",
      name: "addEmployee",
      message: "Would you like to add an employee? (Required)",
    })
    .then(async (response) => {
      var createEmployee = response.addEmployee;
      if ((await createEmployee) === true) {
        newEmployee();
      } else if ((await createEmployee) === false) {
        if (!fs.existsSync(fileDirectory)) {
          fs.mkdirSync(fileDirectory);
        }
        fs.writeFile(filePath, renderHTML(array), (err) => {
          if (err) {
            return console.log(err);
          }
          console.log("Your team profile page has been created successfully!");
        });
      }
    });
};

init();
