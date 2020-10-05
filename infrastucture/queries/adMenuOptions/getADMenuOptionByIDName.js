const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADmenuOption');

const getADMenuOptionByIDName = async (adMenuID,name) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADMENU_ID_NAME, [adMenuID,name]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADMenuOptionByIDName;