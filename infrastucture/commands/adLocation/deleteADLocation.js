const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADLocation');

const deleteADLocation = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ADLOCATION, [id]);
        return result.rows;
      } catch (error) {
        throw error;
    }
};
module.exports = deleteADLocation;
