const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADClientModule");


const createADClientModule = async(params)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.INSERT_ADCLIENTMODULE,
            Object.values(params));
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = createADClientModule;