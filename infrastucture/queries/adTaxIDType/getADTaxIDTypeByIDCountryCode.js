const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADTaxIDType');

const getADTaxIDTypeByIDCountryCode = async (adCountryID,code) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADTAXIDTYPE_IDCOUNTRY_CODE, [adCountryID,code]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADTaxIDTypeByIDCountryCode;