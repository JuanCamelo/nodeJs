const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADProcess");


const getADProcessByID = async(IdProcess)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADPROCESSBYID,[IdProcess]);
        return result.rows;  
    } catch (error) {
        throw error;
    };
};

module.exports = getADProcessByID;