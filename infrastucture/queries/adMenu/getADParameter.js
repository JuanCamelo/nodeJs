const pool = require('../../postgresDB');

const getADParameter = async (adparameterid,type,name,value,list ) => {
    try{
        const sqlQuery = `
            SELECT 
            p.*
            FROM stam.adparameter p
            WHERE p.adparameterid=${adparameterid}
            AND p.type=${type}
            AND p.name=${name}
            AND p.value=${value}
            AND p.list=${list}`

        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADParameter;