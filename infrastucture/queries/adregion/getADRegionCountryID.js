const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADCountry");

const getADRegionCountryID = async (countryId) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADCUNTRY_ID, [countryId]);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = getADRegionCountryID;