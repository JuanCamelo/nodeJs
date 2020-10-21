const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADProcessRole");



const updateADProcessRole = async(params,id)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADPROCESSROLE,[
            ...Object.values(params), id]);
        return result.rows;      
    } catch (error) {
        throw error;
    };
};

module.exports = updateADProcessRole;