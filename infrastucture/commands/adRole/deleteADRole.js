const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADRole');

const deleteADRole = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ADROLE, [id]);
        return result.rows;
      } catch (error) {
        throw error;
    }
};
module.exports = deleteADRole;
