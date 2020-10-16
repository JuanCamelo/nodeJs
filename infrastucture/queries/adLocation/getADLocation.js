const pool = require('../../postgresDB');

const getADLocation = async (adLocationID,adClientID,adCountryID,adRegionID,adCityID,name,address1,address2,defaultLocation,postalCode,isactive,description) => {
    try{
        const sqlQuery = `
            SELECT 
            p.*
            FROM stam.adLocation p 
            WHERE p.adLocationID=${adLocationID} AND p.adClientID=${adClientID} AND p.adCountryID=${adCountryID} AND  p.adRegionID=${adRegionID} AND  p.adCityID=${adCityID} AND  p.name=${name} AND  p.address1=${address1} AND  p.address2=${address2} AND  p.defaultLocation=${defaultLocation} AND  p.postalCode=${postalCode} AND  p.isactive=${isactive} AND  p.description=${description}`

        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADLocation;