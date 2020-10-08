const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADTaxIDType');

const deleteADTaxIDType = async (id) => {
    try {
        const result = await pool.DBConnection.query(sqlQueries.DELETE_ADTAXIDTYPE, [id]);
        return result.rows;
      } catch (error) {
        throw error;
    }
};
module.exports = deleteADTaxIDType;
