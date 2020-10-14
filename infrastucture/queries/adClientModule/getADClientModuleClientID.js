const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADClientModule");


const ADClientModule = async(IDadclient)=>{
    try {
        const result =  await pool.DBConnection.query(sqlQueries.GET_ADCLIENTBY_MODULEID,[IDadclient]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = ADClientModule;