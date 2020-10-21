const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADUser');

const updateADUser = async (params, id) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADUSER, [
        ...Object.values(params),id,
    ]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = updateADUser;
