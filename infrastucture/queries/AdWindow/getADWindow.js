const pool = require('../../postgresDB');

const getADWindow = async (adwindowid,name,isactive) => {
    try{
        const sqlQuery = `
            SELECT p. *
            FROM stam.adwindow p
            WHERE p.adwindowid=${adwindowid}            
            AND p.name=${name}
            AND p.isactive=${isactive}           
           `
     
        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADWindow;