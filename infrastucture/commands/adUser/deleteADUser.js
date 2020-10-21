const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADUser');

const deleteADUser = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ADUSER, [id]);
        return result.rows;
      } catch (error) {
        throw error;
    }
};
module.exports = deleteADUser;
