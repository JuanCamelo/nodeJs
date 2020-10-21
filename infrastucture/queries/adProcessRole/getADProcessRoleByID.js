const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADProcessRole");


const getADProcessroleByID = async(IDProcessRole)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADPROCESSROLEBYID,[IDProcessRole]);
        return result.rows;
    } catch (error) {
        throw error; 
    };
};

module.exports = getADProcessroleByID;