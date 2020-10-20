const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADProcess");


const getADProcessNameByID = async(Name) =>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADPROCESS_NAMEBYID,[Name]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = getADProcessNameByID;