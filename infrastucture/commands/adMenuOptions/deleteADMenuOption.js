const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADmenuOption');

const deleteADMenuOption = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ADMENUOPTION, [id]);
        return result.rows;
      } catch (error) {
        throw error;
    }
};
module.exports = deleteADMenuOption;
