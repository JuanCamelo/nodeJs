const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADmenuOption');

const getADRoleByIDName = async (adMenuID,name) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADMENUOPTION_ID_NAME, [adMenuID,name]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADRoleByIDName;