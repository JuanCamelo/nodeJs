const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADClientModule");


const getADModuleClientByID = async(IDModule, IDClient)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADMODULE_CLIENTBYID,
            [IDModule,IDClient]);
            return result.rows;
    } catch (error) {
        throw error
    };
};

module.exports = getADModuleClientByID;