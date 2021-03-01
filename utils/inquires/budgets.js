const mysql = require('mysql2');
const inquirer = require('inquirer');
const restartQuestions = require('./restartQuestions');

async function getBudget(connection) {
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
    .then(()=>{
      inquirer
        .prompt(
        [
          {
            name: 'department',
            message: 'Which department’s budget do you want?',
            type: 'list',
            choices: departments
          }
        ])
        .then(data => {
          let depId;
          let loop = departments.length;
          for(let i = 0; i < loop; i++) {
            if(departments[i] === data.department) {
              depId = depIds[i];
            }
          }
          const query = connection.query (
            `
            SELECT salary, name
            FROM employees e
            JOIN roles r
              ON e.role_id = r.id
              AND r.department_id = ${depId}
            JOIN departments d
              ON r.department_id = d.id;
            `,
            function(err, res) {
              if (err) throw err;
              let budget = 0;
              let loop = res.length;
              for(let i = 0; i < loop; i++) {
                budget += parseFloat(res[0].salary);
              }
              budget = budget.toFixed(2);
              let formattedBudget = `$${budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              console.log(`
--------------------------------------------------
Budget for ${res[0].name} is: ${formattedBudget}
--------------------------------------------------
              `);
            }
          )
        })
        .then(() => restartQuestions(connection));


    })
    

    
}
module.exports = getBudget;