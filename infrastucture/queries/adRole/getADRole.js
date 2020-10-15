const pool = require('../../postgresDB');

const getADRole = async (adRoleID,adClientID,name,isactive) => {
    try{
        const sqlQuery = `
            SELECT 
            p.*
            FROM stam.adRole p 
            WHERE p.adroleid=${adRoleID} AND p.adClientID=${adClientID}
            AND p.name=${name} AND p.isactive=${isactive}`

        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADRole;