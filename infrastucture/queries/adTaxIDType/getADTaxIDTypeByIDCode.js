const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADTaxIDType');

const getADTaxIDTypeByIDCode = async (adCountryID,code) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADTAXIDTYPE_ID_CODE, [adCountryID,code]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADTaxIDTypeByIDCode;