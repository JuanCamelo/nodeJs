const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADClientGroup');

const updateADClientGroup = async (params, id) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADCLIENTGROUP, [
        ...Object.values(params),id,
    ]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = updateADClientGroup;
