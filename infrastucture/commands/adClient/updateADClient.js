const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADClient');

const updateADClient = async (params, id) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADCLIENT, [
        ...Object.values(params),id,
    ]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = updateADClient;
