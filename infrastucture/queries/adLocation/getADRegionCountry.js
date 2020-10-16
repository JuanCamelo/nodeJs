const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADLocation');

const getAdRegionCountry = async (adRegionID, adCountryID) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADREGION_ADCOUNTRY, [adRegionID, adCountryID]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getAdRegionCountry;