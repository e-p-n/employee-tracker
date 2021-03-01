const inquirer = require('inquirer');
const addToTable = require('../add');


const newDepartment = (connection) => {
    inquirer
      .prompt({
        name: 'name',
        message: 'What is the name of the new department?',
        type: 'text'
      })
      .then(data => {
        addToTable(connection, 'departments', data);
      });
  }

module.exports = newDepartment;