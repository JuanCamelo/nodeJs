const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADProcess");


const createADProcess = async(params)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.INSERT_ADPROCESS,
            Object.values(params));
            return result.rows;      
    } catch (error) {
        throw error;
    };
};

module.exports = createADProcess;