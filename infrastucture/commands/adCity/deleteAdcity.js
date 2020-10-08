const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADCity');

const deleteADCity = async (id) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.DELETE_ADCITY, [id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = deleteADCity;
