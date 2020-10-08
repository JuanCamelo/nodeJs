const pool = require('../../postgresDB');

const getADCity = async (adcityid, name, adregionid) => {
    try {
        const sqlQuery = `
            SELECT p. *
            FROM stam.adcity p
            WHERE p.adcityid=${adcityid}            
            AND p.name=${name}
            AND p.adregionid=${adregionid}           
           `

        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;

    } catch (error) {
        throw error;
    }
};
module.exports = getADCity;