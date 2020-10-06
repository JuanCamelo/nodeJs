const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADRegion");

const createADRegion = async (params) => {
    try {
      const result = await pool.DBConnection.query(
        sqlQueries.INSERT_ADREGION,
        Object.values(params)
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  };
  module.exports = createADRegion;