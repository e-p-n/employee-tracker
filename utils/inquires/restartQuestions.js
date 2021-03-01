const inquirer = require('inquirer');
const startQuestions = require('./startQuestions');


const restartQuestions = connection => {
    inquirer
      .prompt({
        name: 'continue',
        type: 'confirm',
        message: 'Would you like to look up anything else?',
        default: true
      }).then (data => {
        if(data.continue) {
          startQuestions(connection);
        } else {
          connection.end();
        };
        
    })
}



module.exports = restartQuestions;