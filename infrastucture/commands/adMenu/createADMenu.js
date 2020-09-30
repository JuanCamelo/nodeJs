const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADmenu");

const createADMenu = async (params) => {
    try {
      const result = await pool.DBConnection.query(
        sqlQueries.INSERT_ADMENU,
        Object.values(params)
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  };
  module.exports = createADMenu;