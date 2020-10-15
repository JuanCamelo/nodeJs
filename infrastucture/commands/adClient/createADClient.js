const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADClient");

const createADClient = async (params) => {
    try {
      const result = await pool.DBConnection.query(
        sqlQueries.INSERT_ADCLIENT,
        Object.values(params)
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  };
  module.exports = createADClient;