const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADmenu');

const getADMenuByID = async (adMenuID) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADMENU_ID, [adMenuID]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADMenuByID;