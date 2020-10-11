const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADClient');

const getADClientByID = async (adClientID) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADCLIENT_ID, [adClientID]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADClientByID;