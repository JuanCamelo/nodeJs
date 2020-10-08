const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADModule");

const adModuleByID = async (name) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.GET_ADMODULEBY_ID, [name]);
        return result.rows;
    } catch (error) {
        throw error;
    };
};

module.exports = adModuleByID;