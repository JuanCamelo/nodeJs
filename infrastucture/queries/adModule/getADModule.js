const pool = require('../../postgresDB');

const getADModule = async (admoduleid, name ) => {
    try{
        const sqlQuery = `
            SELECT p. *
            FROM stam.admodule p
            WHERE p.admoduleid=${admoduleid}            
            AND p.name=${name}                      
           `
     
        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADModule;