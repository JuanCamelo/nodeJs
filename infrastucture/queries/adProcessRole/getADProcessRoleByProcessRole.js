const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADProcessRole");


const getADProcessRoleByProcessRole = async(adprocessID,adroleID)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADPROCESSROLEBY_PROCESSROLE,
            [adprocessID,adroleID]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = getADProcessRoleByProcessRole;