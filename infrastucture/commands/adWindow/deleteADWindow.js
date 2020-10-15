const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADWindow");


const deleteWuindow = async(IDWuindow)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ADWINDOW,[IDWuindow]);
        return result.rows; 
    } catch (error) {
        throw error;
    };
};



module.exports = deleteWuindow;