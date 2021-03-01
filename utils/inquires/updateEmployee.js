const cTable = require('console.table');
const inquirer = require('inquirer');
const updateEmp = require('../updateEmp');  
const restartQuestions = require('./restartQuestions');

async function updateEmployeeRole(connection) {
    let employees = [];
    let empIds = [];
    let roles = [];
    let roleIds = [];
    await connection.promise().query(
      `
      SELECT  
          CONCAT(first_name, ' ', last_name) AS name,
          id
      FROM employees
        ORDER BY last_name;
      `
    )
    .then((rows) => {
      let loop = rows[0].length;
        for(let i = 0; i < loop; i++) {
            employees.push(rows[0][i].name);
            empIds.push(rows[0][i].id);  
        }
    });
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
    })
    .then(() => {
      inquirer
        .prompt(
        [
          {
            name: 'employee',
            message: 'Which employee’s role would you like to update?',
            type: 'list',
            choices: employees
          },
          {
            name: 'role',
            message: 'What is their new role?',
            type: 'list',
            choices: roles
          }
        ])
        .then (data => {
          let roleInfo = {};
          let empId;
          let loop1 = employees.length;
          let loop2 = roles.length;
          for(let i = 0; i < loop1; i++) {
            if(employees[i] === data.employee) {
              empId = empIds[i];
            }
          }
          for (let i = 0; i < loop2; i++) {
            if(roles[i] === data.role) {
              roleInfo = {role_id: roleIds[i]};
            }
          }
          updateEmp(connection, roleInfo, empId);
        })
        .then(() => restartQuestions(connection));

    })
    

    
};

async function updateEmployeeMan(connection) {
  let employees = [];
  let empIds = [];
  let managers = ['Employee has no manager.'];
  let manIds = [null];

  await connection.promise().query(
    `
    SELECT  
        CONCAT(first_name, ' ', last_name) AS name,
        id
    FROM employees
      ORDER BY last_name;
    `
  )
  .then((rows)=> {
      let loop = rows[0].length;
      for(let i = 0; i < loop; i++) {
          employees.push(rows[0][i].name);
          managers.push(rows[0][i].name);
          empIds.push(rows[0][i].id);
          manIds.push(rows[0][i].id);
      }
      console.table(empIds, employees);
  })
  .then(() => {
    inquirer
      .prompt(
      [
        {
          name: 'employee',
          message: 'Which employee’s manager would you like to update?',
          type: 'list',
          choices: employees
        },
        {
          name:'manager',
          message: 'Who is their new manager?',
          type: 'list',
          choices: managers
        }

      ])
      .then (data => {
        let managerInfo = {};
        let empId;
        let loop1 = employees.length;
        let loop2 = managers.length;
        for(let i = 0; i < loop1; i++) {
          if(employees[i] === data.employee) {
            empId = empIds[i];
          }
        }
        for(let i = 0; i < loop2; i++) {
          if(managers[i] === data.manager) {
            managerInfo = {manager_id: manIds[i]};
          }
        }
        updateEmp(connection, managerInfo, empId);
      })
      .then()
      .then(() => restartQuestions(connection));

    });
  
};

module.exports = {
  updateEmployeeRole,
  updateEmployeeMan
};