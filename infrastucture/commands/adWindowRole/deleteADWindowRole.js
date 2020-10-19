const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADWindowRole");


const deleteAdWindowRole = async(adWindowRoleID)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ADWINDOWROLE,[adWindowRoleID]);
        return result.rows; 
    } catch (error) {
        throw error;
    };
};

module.exports = deleteAdWindowRole;