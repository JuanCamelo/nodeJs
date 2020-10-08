const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADTaxIDType');

const updateADTaxIDType = async (params, id) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADTAXIDTYPE, [
        ...Object.values(params),id,
    ]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = updateADTaxIDType;
