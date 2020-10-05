const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADCountry');

const getADCountryByName = async (name) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADCOUNTRY_TYPE_NAME, [name]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADCountryByName;