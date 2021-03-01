const inquirer = require('inquirer');
const deleteFromTable = require('../delete');
const restartQuestions = require('./restartQuestions');


async function delEmployee(connection) {
    let employees = [];
    let empIds = [];
    await connection.promise().query(
        `
        SELECT  
            CONCAT(first_name, ' ',last_name) AS name,
            id
        FROM employees
          ORDER BY last_name;
        `   
    )
    .then((rows) => {
        let loop = rows[0].length;
        for(let i = 0; i < loop; i++) {
            employees.push(rows[0][i].name);
            empIds.push(rows[0][i].id);  
        }
    })
    .then(() => {
        inquirer
        .prompt({
            name: 'name',
            message: 'Which employee do you want to delete?',
            type: 'list',
            choices: employees
        })
        .then(data => {
            let delId;
            let loop = employees.length;
            for(let i = 0; i < loop; i++) {
                if(employees[i] === data.name){
                    delId = empIds[i];
                }
            }
            deleteFromTable(connection, 'employees', delId);
            
        })
        .then(() => restartQuestions(connection));

    });
};

module.exports = delEmployee;