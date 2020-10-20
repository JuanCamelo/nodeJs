const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADWindowRole");


const getADWindowRole = async(AdWindowRoleID)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADWINDOWROLE_ID,[AdWindowRoleID]);
        return result.rows;      
    } catch (error) {
        throw error;
    };
};


module.exports = getADWindowRole;