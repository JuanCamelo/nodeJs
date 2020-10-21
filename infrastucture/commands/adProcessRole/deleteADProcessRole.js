const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADProcessRole");



const deleteADProcessRole = async(IdProcessRole)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ADPROCESSROLE,[IdProcessRole]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};


module.exports = deleteADProcessRole;