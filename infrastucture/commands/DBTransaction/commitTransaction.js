const pool = require("../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesDBTransaction");

const commitTransaction = async () => {
    try {
      const result = await pool.DBConnection.query(
        sqlQueries.COMMIT_TRANSACTION
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = commitTransaction;
  