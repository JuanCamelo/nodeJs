const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADCountry');

const getADCountryByID = async (adCountryID) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADCUNTRY_ID, [adCountryID]);
    return result.rows;

  } catch (error) {
    throw error;
  }
};
module.exports = getADCountryByID;