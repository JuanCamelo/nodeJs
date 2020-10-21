const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADUser');

const getADUserByID = async (adUserID) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADUSER_ID, [adUserID]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADUserByID;