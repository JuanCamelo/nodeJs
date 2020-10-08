const pool = require('../../postgresDB');

const getADRegion = async (adregionid, name,adcountryid ) => {
    try{
        const sqlQuery = `
            SELECT p. *
            FROM stam.adregion p
            WHERE p.adregionid=${adregionid}            
            AND p.name=${name}
            AND p.adcountryid=${adcountryid}           
           `
     
        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADRegion;