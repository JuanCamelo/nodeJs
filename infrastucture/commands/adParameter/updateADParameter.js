const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADParamerters');

const updateADParameter = async (params, id) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADPARAMETER, [
        ...Object.values(params),id,
    ]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = updateADParameter;
