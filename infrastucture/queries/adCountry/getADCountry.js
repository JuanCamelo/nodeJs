const pool = require('../../postgresDB');

const getADCountry = async (adcountryid, name,language, currency, taxidtype) => {
    try{
        const sqlQuery = `
            SELECT p. *
            FROM stam.adcountry p
            WHERE p.adcountryid=${adcountryid}            
            AND p.name=${name}
            AND p.language=${language}
            AND p.currency=${currency}
            AND p.taxidtype=${taxidtype}
           `
     
        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADCountry;