const pool = require('../../postgresDB');
const sqlQueries = require('../../sqlQueries/sqlQueriesADChangeLog');

const createADChangeLog = async (params) => {
    try {
        const result = await pool.DBConnection.query(
            sqlQueries.INSERT_ADCHANGELOG,
            Object.values(params)
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};
module.exports = createADChangeLog;