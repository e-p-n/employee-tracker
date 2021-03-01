const cTable = require('console.table');
const inquirer = require('inquirer');
const addToTable = require('../add');

async function newRole(connection) {
    
    let departments = [];
    let depIds = [];

    await connection.promise().query(
        `
        SELECT  
            name,
            id
        FROM departments;
        
        `
    )
    .then((rows)=> {
        let loop = rows[0].length;
        for(let i = 0; i < loop; i++) {
            departments.push(rows[0][i].name);
            depIds.push(rows[0][i].id);
           
        }
    })
    .then(() => {

        inquirer
            .prompt(
            [
                {
                    name: 'title',
                    message: 'What is the name of the new role?',
                    type: 'text'
                },
                {
                    name: 'salary',
                    message: 'What is the salary for the role?',
                    type: 'number'      
                },
                {
                    name: 'department',
                    message: 'Which department does this role belong to?',
                    type: 'list',
                    choices: departments
                }
            ])
            .then(data => {
                let newRoleObj = {
                    title: data.title,
                    salary: data.salary
                }
                let loop = departments.length
                for (let i = 0; i < loop; i++) {
                    if(departments[i] === data.department) {
                        newRoleObj.department_id = depIds[i];
                    }
                }
                addToTable(connection, 'roles', newRoleObj);
            });
    });
  }
  
    
  

  module.exports = newRole;
 