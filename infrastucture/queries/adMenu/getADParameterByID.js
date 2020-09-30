const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADParamerters');

const getADParameterByID = async (adParameterID) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADPARAMETER_ID, [adParameterID]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADParameterByID;