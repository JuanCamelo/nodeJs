const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADRegion");

const getRegionNameCounryID = async(CountryID,name)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADREGION_COUNTYIDNAME,[CountryID,name])
        return result.rows;
    } catch (error) {
      throw error;
    }
}

module.exports = getRegionNameCounryID;