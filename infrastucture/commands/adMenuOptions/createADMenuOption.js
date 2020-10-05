const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADmenuOption");

const createADMenuOption = async (params) => {
    try {
      const result = await pool.DBConnection.query(
        sqlQueries.INSERT_ADMENUOPTION,
        Object.values(params)
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  };
  module.exports = createADMenuOption;