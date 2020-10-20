const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADLocation');

const getADLocationByID = async (adLocationID) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.GET_ADLOCATION_ID, [adLocationID]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = getADLocationByID;