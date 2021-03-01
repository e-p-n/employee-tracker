const inquirer = require('inquirer');
const addToTable = require('../add');
const restartQuestions = require('./restartQuestions');

async function newEmployee(connection) {
    
    let roles = [];
    let roleIds = [];
    let managers = ['Employee has no manager.'];
    let managerIds = [null];
    await connection.promise().query(
        `
        SELECT  
            title,
            id
        FROM roles;
        
        `
    )
    .then((rows)=> {
        let loop = rows[0].length;
        for(let i = 0; i < loop; i++) {
            roles.push(rows[0][i].title);
            roleIds.push(rows[0][i].id);
        }
    });
    await connection.promise().query(
        `
        SELECT  
            CONCAT(first_name, ' ', last_name) AS manager,
            id
        FROM employees;
        
        `
    )
    .then((rows)=> {
        let loop = rows[0].length;
        for(let i = 0; i < loop; i++) {
            managers.push(rows[0][i].manager);
            managerIds.push(rows[0][i].id);
        }
    })
    .then(() => {

        inquirer
            .prompt(
            [
            {
                name: 'first_name',
                message: 'What is the first name of the new employee?',
                type: 'text'
            },
            {
                name: 'last_name',
                message: 'What is the last name of the new employee?',
                type: 'text'      
            },
            {
                name: 'role',
                message: 'What is the new employee’s job?',
                type: 'list',
                choices: roles
            },
            {
                name: 'manager',
                message: "Who is the new employee’s manager?",
                type: 'list',
                choices: managers
            }
            ]
            )
            .then(data => {
                let newEmpObj = {
                    first_name: data.first_name,
                    last_name: data.last_name,
                }
                let loop = roles.length
                for (let i = 0; i < loop; i++) {
                    if(roles[i] === data.role) {
                        newEmpObj.role_id = roleIds[i];
                    }
                    if (managers[i] == data.manager) {
                        newEmpObj.manager_id = managerIds[i];
                    }
                }
                addToTable(connection, 'employees', newEmpObj);
            })
            .then(() => restartQuestions(connection));
    })
  }
  
    
  

  module.exports = newEmployee;
 