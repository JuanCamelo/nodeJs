const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADCity");

const createADCity = async (params) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.INSERT_ADCITY,
      Object.values(params)
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = createADCity;