const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADWindow");


const getADWuindowNameByID = async(name)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADWINDOW_NAME, [name]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = getADWuindowNameByID;