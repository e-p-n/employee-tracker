const mysql = require('mysql2');

// convertDataForRole = (connection,roleIfo){

// }

// convertDataForEmp = (connection, empInfo){

// }

addToTable = (connection, table, addInfo) => {
    console.log(`Adding to ${table}...\n`);
    const query = connection.query(
        `INSERT INTO ${table} SET ?`, addInfo,
        
        function(err, res) {
            if (err) throw err;
            console.log('Task Completed!\n');
        }
    );
   
}

//module.exports = {convertDataForRole, convertDataForEmp, addToTable};
module.exports = addToTable;
 