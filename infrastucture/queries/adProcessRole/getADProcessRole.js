const pool = require("../../postgresDB");

const getADProcessRole = async(adprocessroleid,adprocessid,adroleid,isactive)=>{
    try {
        const sqlQueries = `
            SELECT p. *
            FROM stam.adprocessrole p
            WHERE p.adprocessroleid =${adprocessroleid}
            AND p.adprocessid =${adprocessid}
            AND p.adroleid =${adroleid}
            AND p.isactive =${isactive}        
        `
        const result = await pool.DBConnection.query(sqlQueries)
        return result.rows;      
    } catch (error) {
        throw error;
    };
};


module.exports = getADProcessRole

