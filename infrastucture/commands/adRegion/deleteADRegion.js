const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADRegion");


const deleteADRegion = async (id) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.DELETE_ADREGION, [id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = deleteADRegion;