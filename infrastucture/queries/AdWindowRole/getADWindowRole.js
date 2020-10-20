const pool = require('../../postgresDB');

const getADWindowRole = async (adWindowRoleid,adwindowid,adRoleID,isReadWrite,isactive) => {
    try{
        const sqlQuery = `
            SELECT p. *
            FROM stam.adwindowrole p
            WHERE p.adwindowroleid=${adWindowRoleid}            
            AND p.adwindowid=${adwindowid} 
            AND p.adroleid=${adRoleID} 
            AND p.isReadWrite=${isReadWrite} 
            AND p.isactive=${isactive}           
           `
     
        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows;    

    }  catch (error) {
        throw error;
    }
};
module.exports = getADWindowRole;