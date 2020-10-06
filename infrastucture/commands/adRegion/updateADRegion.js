const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADRegion");


const updateADRegion = async (params, id) => {
    try {
      const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADREGION,[
          ...Object.values(params),id,
      ]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  };

module.exports = updateADRegion;