const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADTaxIDType');

const getADTaxIDTypeByIDCountryName = async (adCountryID,name) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADTAXIDTYPE_IDCOUNTRY_NAME, [adCountryID,name]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADTaxIDTypeByIDCountryName;