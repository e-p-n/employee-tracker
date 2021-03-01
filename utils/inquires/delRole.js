const inquirer = require('inquirer');
const deleteFromTable = require('../delete');
const restartQuestions = require('./restartQuestions');


async function delRole(connection) {
    let roles = [];
    let roleIds = [];
    await connection.promise().query(
        `
        SELECT  
            title,
            id
        FROM roles
          ORDER BY title;
        `   
    )
    .then((rows) => {
        let loop = rows[0].length;
        for(let i = 0; i < loop; i++) {
            roles.push(rows[0][i].title);
            roleIds.push(rows[0][i].id);  
        }
    })
    .then(() => {
        inquirer
        .prompt({
            name: 'title',
            message: 'Which role do you want to delete?',
            type: 'list',
            choices: roles
        })
        .then(data => {
            let delId;
            let loop = roles.length;
            for(let i = 0; i < loop; i++) {
                if(roles[i] === data.title){
                    delId = roleIds[i];
                }
            }
            deleteFromTable(connection, 'roles', delId);
        })
        .then(() => restartQuestions(connection));

    });
};

module.exports = delRole;