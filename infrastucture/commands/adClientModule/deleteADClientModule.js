const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADClientModule");


const deleteADClientModule = async(IdClientModule)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ADCLIENTMODULE,
            [IdClientModule]);
        return result.rows;

    } catch (error) {
        throw error;
    };
};

module.exports = deleteADClientModule;