const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADRole');

const getADRoleByID = async (adRoleID) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADROLE_ID, [adRoleID]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADRoleByID;