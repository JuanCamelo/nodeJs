const pool = require("../../postgresDB");
const sqlQueries = require("../../sqlQueries/sqlQueriesADCity");

const updateADCity = async (params,id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.UPDATE_ADCITY, [
            ...Object.values(params), id,
        ]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};
module.exports = updateADCity;