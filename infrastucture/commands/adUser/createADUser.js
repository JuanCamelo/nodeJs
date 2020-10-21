const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADUser");

const createADUser = async (params) => {
    try {
      const result = await pool.DBConnection.query(
        sqlQueries.INSERT_ADUSER,
        Object.values(params)
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  };
  module.exports = createADUser;