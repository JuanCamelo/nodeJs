const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADWindowRole");


const createADWindowRole = async (params)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.INSERT_ADWINDOWROLE,
            Object.values(params));
        return result.rows;
    } catch (error) {
        throw error;
    };
};


module.exports = createADWindowRole;