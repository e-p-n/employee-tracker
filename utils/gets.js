const cTable = require('console.table');
const inquirer = require('inquirer');
const restartQuestions = require('./inquires/restartQuestions');


  

getDepartments = (connection) => {
    return connection.query(
        `SELECT 
            id AS 'ID',
            name AS Department 
        FROM departments`,
        function(err, rows) {
            if (err) throw err;
            console.log('');
            console.table(rows);
            restartQuestions(connection);

        }
    )
}
  
getRoles = (connection) => {
    return connection.query(
        `
        SELECT 
            title AS 'Job Title', 
            roles.id AS 'Role ID', 
            name AS Department, 
            CONCAT('$', FORMAT(salary, 2)) AS Salary 
            FROM roles LEFT JOIN departments 
            ON roles.department_id = departments.id;    
        `,
        function(err, rows) {
            if (err) throw err;
            console.log('');
            console.table(rows);
            restartQuestions(connection);
        }
    );

};

getEmployees = (connection) => {
    return connection.query(
        `
        SELECT e.id AS 'Employee ID', 
                e.first_name AS 'First Name', 
                e.last_name AS 'Last Name',
                title AS 'Job Title', 
                d.name AS Department,
                CONCAT('$', FORMAT(salary, 2)) AS Salary,
                CONCAT(m.first_name, ' ', m.last_name) AS Manager
        FROM employees e
        LEFT JOIN roles r
        ON e.role_id = r.id
        LEFT JOIN departments d
        ON r.department_id = d.id
        LEFT JOIN employees m
        ON e.manager_id = m.id;    
        `,
        function(err, res) {
        if (err) throw err;
        console.log('');
        console.table(res);
        restartQuestions(connection);
    }
    );
};
    


module.exports = {
    getDepartments, 
    getRoles,
    getEmployees
};
