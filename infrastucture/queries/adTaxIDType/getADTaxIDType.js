const pool = require('../../postgresDB');

const getADTaxIDType = async (adTaxIDTypeID,adCountryID,name,code) => {
    try{
        const sqlQuery = `
            SELECT 
            p.*
            FROM stam.adTaxIDType p 
            WHERE p.adtaxidtype=${adTaxIDTypeID} AND p.adcountryid=${adCountryID}
            AND p.name=${name} AND p.code =${code}`

        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADTaxIDType;