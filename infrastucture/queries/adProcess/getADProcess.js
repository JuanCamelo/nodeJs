const pool = require('../../postgresDB');

const getADProcess = async (adprocesid,name, description,isactive ) => {
    try{
        const sqlQuery = `
            SELECT p. *
            FROM stam.adprocess p
            WHERE p.adprocesid=${adprocesid}    
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