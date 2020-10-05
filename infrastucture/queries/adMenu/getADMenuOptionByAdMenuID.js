const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADmenu');

const getADMenuOptionByAdMenuID = async (adMenuID) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADMENUOPTION_ADMENUID, [adMenuID]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADMenuOptionByAdMenuID;