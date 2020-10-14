const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADRole');

const updateADRole = async (params, id) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADROLE, [
        ...Object.values(params),id,
    ]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = updateADRole;
