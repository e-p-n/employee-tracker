const cTable = require('console.table');
const inquirer = require('inquirer');
const restartQuestions = require('./restartQuestions');


async function findEmployeesByDept(connection) {

    let departments = [];
    let deptIds = [];

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
            deptIds.push(rows[0][i].id);  
        }
    })
    .then(() => {
        inquirer
        .prompt({
            name: 'name',
            message: 'List employees of which department?',
            type: 'list',
            choices: departments
        })
        .then(data => {
            let deptId;
            let loop = departments.length;
            for(let i = 0; i < loop; i++) {
                if(departments[i] === data.name){
                    deptId = deptIds[i];
                }
            }
            connection.query(
            `SELECT name FROM departments WHERE id = ${deptId}`,
                function(err, res) {
                    if (err) throw err;
                    console.log(`
---------------------------------------------------
-------- Employees from ${res[0].name} --------
---------------------------------------------------
                    `);
                }
            )
            connection.query(
                `
                SELECT e.id AS 'Employee ID', 
                        e.first_name AS 'First Name', 
                        e.last_name AS 'Last Name',
                        title AS 'Job Title', 
                        CONCAT('$', FORMAT(salary, 2)) AS Salary,
                        CONCAT(m.first_name, ' ', m.last_name) AS Manager
                FROM employees e
                LEFT JOIN roles r
                ON e.role_id = r.id
                JOIN departments d
                ON r.department_id = d.id
                AND d.id = ${deptId}
                LEFT JOIN employees m
                ON e.manager_id = m.id;    
                `,
                function(err, res) {
                if (err) throw err;
                console.table(res);
                restartQuestions(connection);
                }
            );
        }); 
    });
}
  
async function findEmployeesByManager(connection) {
    let managers = ['No manager.'];
    let manIds = [null];
  
    await connection.promise().query(
      `
      SELECT DISTINCT
          CONCAT(m.first_name, ' ', m.last_name) AS name,
          m.id
      FROM employees e
      JOIN employees m
        ON m.id = e.manager_id;
      `
    )
    .then((rows)=> {
        let loop = rows[0].length;
        for(let i = 0; i < loop; i++) {
            managers.push(rows[0][i].name);
            manIds.push(rows[0][i].id);
        }
    })
    .then(() => {
        inquirer
        .prompt(
        [
            {
            name: 'manager',
            message: 'List employee’s of which manager?',
            type: 'list',
            choices: managers
            }
        ])
        .then (data => {
            let manId;
            let loop = managers.length;
            for(let i = 0; i < loop; i++) {
                if(managers[i] === data.manager) {
                manId = manIds[i];
                }
            }
            connection.query(
                `SELECT first_name, last_name
                    FROM employees 
                    WHERE id = ${manId}
                `,
                function(err, res) {
                if (err) throw err;
                console.log(`
---------------------------------------------------
-------- Employees Managed by ${res[0].first_name} ${res[0].last_name} --------
---------------------------------------------------
            `);
                //console.log(res);
                }
            )
            connection.query(
                `
                SELECT e.id AS 'Employee ID', 
                        e.first_name AS 'First Name', 
                        e.last_name AS 'Last Name',
                        title AS 'Job Title', 
                        CONCAT('$', FORMAT(salary, 2)) AS Salary,
                        CONCAT(m.first_name, ' ', m.last_name) AS Manager
                FROM employees e
                LEFT JOIN roles r
                ON e.role_id = r.id
                LEFT JOIN departments d
                ON r.department_id = d.id
                JOIN employees m
                ON e.manager_id = m.id
                AND e.manager_id = ${manId};
                `,
                function(err, res) {
                if (err) throw err;
                console.table(res);
                restartQuestions(connection);
                }
            );
        })
    })


}

module.exports = {
    findEmployeesByDept, 
    findEmployeesByManager
};