const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADWindowRole");


const getADWindowRoleByWindowIdRoleId = async(AdWindowID,AdRoleID)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADWINDOWROLE_WINDOW_ROLE, [AdWindowID,AdRoleID]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = getADWindowRoleByWindowIdRoleId;