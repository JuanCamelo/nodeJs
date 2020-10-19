const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADWindowRole");


const updateADWindowRole = async(params, id)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADWINDOWROLE,[
            ...Object.values(params),id]);
            return result.rows;
    } catch (error) {
        throw error;      
    };
};

module.exports = updateADWindowRole;