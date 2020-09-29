const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADParamerters");

const createADParameter = async (params) => {
    try {
      const result = await pool.DBConnection.query(
        sqlQueries.INSERT_ADPARAMETER,
        Object.values(params)
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  };
  module.exports = createADParameter;