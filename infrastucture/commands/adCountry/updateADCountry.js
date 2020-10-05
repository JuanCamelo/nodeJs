const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADCountry');

const updateADCountry = async (params, id) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADCOUNTRY, [
      ...Object.values(params), id,
    ]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = updateADCountry;