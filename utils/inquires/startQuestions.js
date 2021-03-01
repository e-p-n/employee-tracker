const inquirer = require('inquirer');

//const {getEmployeesByDept, getEmployeesByManager} = require('../gets/employee');
const {getDepartments, getRoles, getEmployees} = require('../gets');
const {updateEmployeeRole, updateEmployeeMan} = require('./updateEmployee');
const newDepartment = require('./newDepartment');
const newEmployee = require('./newEmployee');
const newRole = require('./newRole');
const delDepartment = require('./delDepartment');
const delRole = require('./delRole');
const delEmployee = require('./delEmployee');
const getBudget = require('./budgets');

const startQuestions = (connection) => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            // 'View employees by department',
            // 'View employees by manager',
            'View department budgets',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee’s role',
            'Update an employee’s manager',
            'Delete a department',
            'Delete a role',
            'Delete an employee',
            'Exit']
        })
        .then(data => {
            switch(data.action) {
            case 'View all departments':
                getDepartments(connection);
                break;
            case 'View all roles':
                getRoles(connection);
                break;
            case 'View all employees':
                getEmployees(connection);
                break;
            // case 'View employees by department':
            //     //selectDepartment();
            //     break;
            // case 'View employees by manager':
            //     break;
            case 'View department budgets':
                getBudget(connection);
                break;
            case 'Add a department':
                newDepartment(connection);
                break;
            case 'Add a role':
                newRole(connection);
                break;
            case 'Add an employee':
                newEmployee(connection);
                break;
            case 'Update an employee’s role':
                updateEmployeeRole(connection);
                break;
            case 'Update an employee’s manager':
                updateEmployeeMan(connection);
                break;
            case 'Delete a department':
                delDepartment(connection);
                break;
            case 'Delete a role':
                delRole(connection);
                break;
            case 'Delete an employee':
                delEmployee(connection);
                break;
            case 'Exit':
                connection.end();
                break;
            }
            
        })
}



module.exports = startQuestions;