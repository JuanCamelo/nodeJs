const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADRegion");

const getADRegionID = async (adRegionID) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADREGION_ID, [adRegionID]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = getADRegionID;