const pool = require('../../postgresDB');

const getADClient = async (adclientid,adclientgroupid,adcountryid,adtaxidtypeid,name,taxid,isactive) => {
    try{
        const sqlQuery = `
            SELECT 
            p.*
            FROM stam.adClient p
            WHERE p.adclientid=${adclientid} 
            AND p.adclientgroupid=${adclientgroupid}
            AND p.adcountryid=${adcountryid}
            AND p.adtaxidtypeid=${adtaxidtypeid}
            AND p.name=${name}
            AND p.taxid=${taxid} 
            AND p.isactive=${isactive}`

        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADClient;