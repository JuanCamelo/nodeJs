const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADmenuOption');

const updateADMenuOption = async (params, id) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADMENUOPTION, [
        ...Object.values(params),id,
    ]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = updateADMenuOption;
