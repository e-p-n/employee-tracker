const inquirer = require('inquirer');
const deleteFromTable = require('../delete');
const restartQuestions = require('./restartQuestions');


async function delDepartment(connection) {
    let departments = [];
    let depIds = [];
    await connection.promise().query(
        `
        SELECT  
            name,
            id
        FROM departments
          ORDER BY name;
        `   
    )
    .then((rows) => {
        let loop = rows[0].length;
        for(let i = 0; i < loop; i++) {
            departments.push(rows[0][i].name);
            depIds.push(rows[0][i].id);  
        }
    })
    .then(() => {
        inquirer
        .prompt({
            name: 'name',
            message: 'Which department do you want to delete?',
            type: 'list',
            choices: departments
        })
        .then(data => {
            let delId;
            let loop = departments.length;
            for(let i = 0; i < loop; i++) {
                if(departments[i] === data.name){
                    delId = depIds[i];
                }
            }
            deleteFromTable(connection, 'departments', delId);
        })
        .then(() => restartQuestions(connection));


    });
};

module.exports = delDepartment;