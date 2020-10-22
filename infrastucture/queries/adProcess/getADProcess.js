const pool = require('../../postgresDB');

const getADProcess = async (adprocessid,name, description,isactive ) => {
    try{
        const sqlQuery = `
            SELECT p. *
            FROM stam.adprocess p
            WHERE p.adprocessid=${adprocessid}    
            AND p.description=${description}        
            AND p.name=${name}
            AND p.isactive=${isactive}           
           `
     
        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADProcess;