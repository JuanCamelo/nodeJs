const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADClient');

const deleteADClient = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ADCLIENT, [id]);
        return result.rows;
      } catch (error) {
        throw error;
    }
};
module.exports = deleteADClient;
