const cTable = require('console.table');
const inquirer = require('inquirer');
  

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
        }
    );

};


module.exports = {
    getDepartments, 
    getRoles
};
