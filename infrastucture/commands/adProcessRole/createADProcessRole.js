const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADProcessRole");


const createADProcessRole = async(params)=>{
    try {
        const result = await pool.DBConnection.query(sqlQueries.INSERT_ADPROCESSROLE,
            Object.values(params));
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = createADProcessRole;