const pool = require('../../postgresDB');

const getADClientModule = async (adclientmoduleid,admoduleid,adclientid,isactive) => {
    try{
        const sqlQuery = `
            SELECT p. *
            FROM stam.adclientmodule p
            WHERE p.adclientmoduleid=${adclientmoduleid}            
            AND p.admoduleid=${admoduleid}
            AND p.adclientid=${adclientid}
            AND p.isactive=${isactive}            
           `
     
        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADClientModule;