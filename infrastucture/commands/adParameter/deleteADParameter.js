const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADParamerters');

const deleteADParameter = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ADPARAMETER, [id]);
        return result.rows;
      } catch (error) {
        throw error;
    }
};
module.exports = deleteADParameter;
