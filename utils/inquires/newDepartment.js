const inquirer = require('inquirer');
const addToTable = require('../add');
const restartQuestions = require('./restartQuestions');


const newDepartment = (connection) => {
    inquirer
      .prompt({
        name: 'name',
        message: 'What is the name of the new department?',
        type: 'text'
      })
      .then(data => {
        addToTable(connection, 'departments', data);
      })
      .then(() => restartQuestions(connection));

  }

module.exports = newDepartment;