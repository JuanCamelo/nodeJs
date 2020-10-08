const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADRegion");

const getADCityRegioID = async (RegioID) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADREGION_ID,[RegioID]);
        return result.rows;

    } catch (error) {
        throw error;
    }
};

module.exports = getADCityRegioID;


