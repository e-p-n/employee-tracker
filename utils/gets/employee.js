const mysql = require('mysql2');
const cTable = require('console.table');


getEmployeesByDept = (connection, deptId) => {
    const deptName = connection.query(
        `SELECT name FROM departments WHERE id = ${deptId}
    `,
        function(err, res) {
        if (err) throw err;
        console.log(`
---------------------------------------------------
-------- Employees from ${res[0].name} --------
---------------------------------------------------
    `);
        //console.log(res);
        }
    )
    return connection.query(
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
        }
    );

}
  
getEmployeesByManager = (connection, manId) => {
    const deptName = connection.query(
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
    return connection.query(
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
        }
    );

}

module.exports = {
    getEmployees, 
    getEmployeesByDept, 
    getEmployeesByManager
};