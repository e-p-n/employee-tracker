
addToTable = (connection, table, addInfo) => {
    const query = connection.query(
        `INSERT INTO ${table} SET ?`, addInfo,
        
        function(err, res) {
            if (err) throw err;
        }
    );
   
}

module.exports = addToTable;
 