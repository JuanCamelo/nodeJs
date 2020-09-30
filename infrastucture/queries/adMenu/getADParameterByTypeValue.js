const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADParamerters');

const getADParameterByTypeValue = async (type,value) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADPARAMETER_TYPE_VALUE, [type,value]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADParameterByTypeValue;