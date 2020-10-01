const pool = require('../../postgresDB');

const getADMenuByID = async (admenuid) => {
    try{
        const sqlQuery = `
            SELECT 
            p.*
            FROM stam.admenu p
            WHERE p.admenuid=${admenuid}`

        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADMenuByID;