const pool = require('../../postgresDB');

const getADUser = async (adUserID,adClientID,adroleID,name,email,phonenumber,language,avatar,isactive) => {
    try{

        
        const sqlQuery = `
            SELECT 
            p.*
            FROM stam.adUser p 
            WHERE p.aduserid=${adUserID} AND p.adClientID=${adClientID}  AND p.adroleid=${adroleID} AND p.name=${name} AND p.email=${email}  AND p.phonenumber=${phonenumber}  AND p.language=${language}  AND p.avatar=${avatar} AND p.isactive=${isactive}`

        const p = sqlQuery    
        const result = await pool.DBConnection.query(sqlQuery);
        return result.rows; 

    }  catch (error) {
        throw error;
    }
};
module.exports = getADUser;