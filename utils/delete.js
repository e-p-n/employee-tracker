const mysql = require('mysql2');
  

deleteFromTable = (connection,table, deleteId) => {
    const query = connection.query(
        `DELETE FROM ${table} WHERE id = ?`, deleteId,
        function(err, res) {
            if (err) throw err;
        }
    );
}; 

module.exports = deleteFromTable;