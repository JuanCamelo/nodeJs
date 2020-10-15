const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADWindow");


const createADWindow = async (params)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.INSERT_ADWINDOW,
            Object.values(params));
        return result.rows;
    } catch (error) {
        throw error;
    };
};


module.exports = createADWindow;