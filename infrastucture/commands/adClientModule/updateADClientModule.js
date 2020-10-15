const pool = require("../../postgresDB");
const sqlQueies = require("../../sqlQueries/sqlQueriesADClientModule");


const updateADClientModule = async(params,Id)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueies.UPDATE_ADCLIENTMODULE,[
            ...Object.values(params),Id
            ]);
        return result.rows;
        
    } catch (error) {
        throw error;
    };
};


module.exports = updateADClientModule;