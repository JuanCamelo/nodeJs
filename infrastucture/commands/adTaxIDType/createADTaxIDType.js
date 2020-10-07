const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADTaxIDType");

const createADTaxIDType = async (params) => {
    try {
      const result = await pool.DBConnection.query(
        sqlQueries.INSERT_ADTAXIDTYPE,
        Object.values(params)
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  };
  module.exports = createADTaxIDType;