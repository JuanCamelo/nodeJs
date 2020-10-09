const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADmenu');

const deleteADMenu = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ADMENU, [id]);
        return result.rows;
      } catch (error) {
        throw error;
    }
};
module.exports = deleteADMenu;
