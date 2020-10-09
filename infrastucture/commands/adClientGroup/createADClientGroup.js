const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADClientGroup");

const createADClientGroup = async (params) => {
    try {
      const result = await pool.DBConnection.query(
        sqlQueries.INSERT_ADCLIENTGROUP,
        Object.values(params)
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  };
  module.exports = createADClientGroup;