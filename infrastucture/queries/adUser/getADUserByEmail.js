const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADUser');

const getADUserByEmail = async (email) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADUSER_EMAIL, [email]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADUserByEmail;