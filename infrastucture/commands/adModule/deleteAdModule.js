const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADModule");


const deleteADModule = async (id) => {
  try {
    const result = await pool.DBConnection.query(sqlQueries.DELETE_ADMODULE, [id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = deleteADModule;