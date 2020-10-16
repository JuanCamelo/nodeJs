const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADLocation");

const createADLocation = async (params) => {
    try {
      const result = await pool.DBConnection.query(
        sqlQueries.INSERT_ADLOCATION,
        Object.values(params)
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  };
  module.exports = createADLocation;