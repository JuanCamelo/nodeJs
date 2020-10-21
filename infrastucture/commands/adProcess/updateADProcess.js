const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADProcess");


const updateADProcess = async(params ,id)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADPROCESS,[
            ...Object.values(params),id]);
            return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = updateADProcess;