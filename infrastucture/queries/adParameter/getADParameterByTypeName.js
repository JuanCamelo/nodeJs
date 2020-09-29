const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADParamerters');

const getADParameterByTypeName = async (type,name) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADPARAMETER_TYPE_NAME, [type,name]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADParameterByTypeName;