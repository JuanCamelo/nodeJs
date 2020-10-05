const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADCountry");

const createADCountry = async (params) => {
  try {
    const result = await pool.DBConnection.query(
      sqlQueries.INSERT_ADCOUNTRY,
      Object.values(params)
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = createADCountry;