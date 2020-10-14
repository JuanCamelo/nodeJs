const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADRole");

const createADRole = async (params) => {
    try {
      const result = await pool.DBConnection.query(
        sqlQueries.INSERT_ADROLE,
        Object.values(params)
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  };
  module.exports = createADRole;