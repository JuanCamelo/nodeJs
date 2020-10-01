const pool = require('../../postgresDB');

const getADMenu = async (admenuid,name) => {
    try{
        const sqlQuery = `
            SELECT 
            p.*
            FROM stam.admenu p
            WHERE p.admenuid=${admenuid}
            AND p.name=${name}`

        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADMenu;