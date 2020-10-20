const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADLocation');

const getADLocationByIDName = async (adClientID,name,adRoleID) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADROLE_ID_NAME, [adClientID,name,adRoleID]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADLocationByIDName;