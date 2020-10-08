const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADCity");

const getCityNameByID = async (CountryID, name) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADCITY_REGION, [CountryID, name])
    return result.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = getCityNameByID;