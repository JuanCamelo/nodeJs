const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADClientModule");


const getADClientModuleByID = async(IDClientModule)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADCLIENTMODULEBYID,
            [IDClientModule]);  
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = getADClientModuleByID;