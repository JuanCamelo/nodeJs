const pool = require('../../postgresDB');

const getADRole = async (adMenuOptionID,adMenuID,name) => {
    try{
        const sqlQuery = `
            SELECT 
            p.*
            FROM stam.admenuoption p 
            WHERE p.admenuoptionid=${adMenuOptionID} AND p.admenuid=${adMenuID}
            AND p.name=${name}`

        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADRole;