const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADProcess");


const deleteADProcess = async(IDProcess)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ADPROCESS,[IDProcess]);
        return result.rows;
    } catch (error) {
        throw error;      
    };
};

module.exports = deleteADProcess;