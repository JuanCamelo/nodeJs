const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADmenuOption');

const getADMenuOptionByID = async (adMenuOptionID) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADMENUOPTION_ID, [adMenuOptionID]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADMenuOptionByID;