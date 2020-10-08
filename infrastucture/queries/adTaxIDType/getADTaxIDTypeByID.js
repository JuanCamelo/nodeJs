const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADTaxIDType');

const getADTaxIDTypeByID = async (adTaxIDTypeid) => {
  
  try {
    
    const result = await pool.DBConnection.query(sqlQueries.GET_ADTAXIDTYPE_ID, [adTaxIDTypeid]);
    const adtax=adTaxIDTypeid;
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADTaxIDTypeByID;