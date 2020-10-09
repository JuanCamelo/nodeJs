const pool = require('../../postgresDB');

const getADClientGroup = async (adclientgroupid,name,isactive) => {
    try{
        const sqlQuery = `
            SELECT 
            p.*
            FROM stam.adClientGroup p
            WHERE p.adclientgroupid=${adclientgroupid}
            AND p.name=${name} 
            AND p.isactive=${isactive}`

        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADClientGroup;