const sqlQueries = {

    INSERT_ADUSER:
        "INSERT INTO " +
        "stam.adUser(adclientid,adroleid,name,email,phonenumber,language,avatar,isactive,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) "+
        "RETURNING adUser.adUserid",

    UPDATE_ADUSER:
        "UPDATE " +
        "stam.adUser " +
        "SET adroleid=$1, name=$2, phonenumber=$3, language=$4, avatar=$5, isactive=$6, updated=$7,updatedby=$8 " +
        "WHERE aduserID=$9",

         
    DELETE_ADUSER:
        "DELETE " +
        "FROM stam.adUser " +
        "where adUserID=$1", 

    GET_ADUSER_EMAIL:
        "SELECT p.* " +
        "FROM stam.adUser p " +
        "WHERE p.email=$1" , 

    GET_ADUSER_ID:
        "SELECT p.* " +
        "FROM stam.adUser p " +
        "WHERE p.aduserid=$1", 
}
module.exports = sqlQueries;