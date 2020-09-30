const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADmenu');

const getADMenuByName = async (name) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADMENU_NAME, [name]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADMenuByName;