// refers back to Employee.js file
const Employee = require("./Employee");

class Manager extends Employee {
    constructor() {
        
        this.officeNumber = officeNumber;
        this.getRole = "Manager";
    };    
};

module.exports = Manager;