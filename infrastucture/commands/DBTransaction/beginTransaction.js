const pool = require("../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesDBTransaction");

const beginTransaction = async () => {
    try {
      const result = await pool.DBConnection.query(
        sqlQueries.BEGIN_TRANSACTION
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = beginTransaction;
  