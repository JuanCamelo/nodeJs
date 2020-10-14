const { errorMonitor } = require("winston-daily-rotate-file");
const { commitTransaction } = require("../../commands/DBTransaction/DBTransactionCommandsModule");
const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADWindow");


const getADWindow = async(WindowID)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADWINDOW_ID,[WindowID]);
        return result.rows;      
    } catch (error) {
        throw error;
    };
};


module.exports = getADWindow;