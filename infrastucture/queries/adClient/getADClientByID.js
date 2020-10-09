const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADClientGroup');

const getADClientGroupByID = async (adMenuID) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADCLIENTGROUP_ID, [adMenuID]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADClientGroupByID;