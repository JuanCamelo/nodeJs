const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADCity");


const getADCityByID = async(CityID)=> {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADCITY_ID,[CityID]);
        return result.rows;

    } catch (error) {
        throw error;
    };
};

module.exports = getADCityByID;