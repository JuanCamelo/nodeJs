const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADLocation');

const getAdCityRegion = async (adCityid, adRegionID) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADCITY_ADREGION, [adCityid, adRegionID]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getAdCityRegion;