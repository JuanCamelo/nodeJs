const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADClientGroup');

const deleteADClientGroup = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ADCLIENTGROUP, [id]);
        return result.rows;
      } catch (error) {
        throw error;
    }
};
module.exports = deleteADClientGroup;
