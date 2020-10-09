const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADTaxIDType');

const getADTaxIDTypeByIDName = async (adCountryID,name,adTaxIdTypeid) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADTAXIDTYPE_ID_NAME, [adCountryID,name,adTaxIdTypeid]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADTaxIDTypeByIDName;