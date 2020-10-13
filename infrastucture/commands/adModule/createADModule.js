const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADModule");

const createMudule = async(params)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.INSERT_ADMODULE,
            Object.values(params));
        return result.rows
    } catch (error) {
        throw error;
    };
};

module.exports = createMudule;
