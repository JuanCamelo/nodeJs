const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADModule");

const createMudule = async(params,id)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADMODULE, [
          ...Object.values(params), id,
        ]);
        return result.rows;
      } catch (error) {
        throw error;
      }
};

module.exports = createMudule;