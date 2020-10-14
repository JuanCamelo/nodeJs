const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADWindow");


const updateADWindow = async(params, id)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADWINDOW,[
            ...Object.values(params),id]);
            return result.rows;
    } catch (error) {
        throw error;      
    };
};

module.exports = updateADWindow;