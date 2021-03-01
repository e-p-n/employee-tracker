const startQuestions = require('./inquires/startQuestions');

async function updateEmp(connection, updateType, empId){
    await connection.promise().query(
        `UPDATE employees SET ? WHERE ?`, 
        [
            updateType,
            {id: empId}
        ]
    )
    .then()
    .then(() => startQuestions());
        
}

module.exports = updateEmp;