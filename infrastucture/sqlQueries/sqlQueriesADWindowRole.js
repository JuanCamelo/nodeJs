const sqlQueries = {
    INSERT_ADWINDOWROLE:
        "INSERT INTO " +
        "stam.adwindowrole(adwindowid,adroleid,isreadwrite,isactive,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6,$7,$8) " +
        "RETURNING adwindowroleid",
    
    UPDATE_ADWINDOWROLE:
        "UPDATE " +
        "stam.adwindowrole " +
        "SET isreadwrite=$1,isactive=$2,updated=$3,updatedby=$4 " +
        "WHERE adwindowroleid=$5",
    
    DELETE_ADWINDOWROLE:
        "DELETE " +
        "FROM stam.adwindowrole " +
        "where adwindowroleid=$1",
    
    GET_ADWINDOWROLE_ID:
        "SELECT p.* " +
        "FROM stam.adwindowrole p " +
        "WHERE p.adwindowroleid=$1",
    
    GET_ADWINDOWROLE_WINDOW_ROLE:
        "SELECT p.* " +
        "FROM stam.adwindowrole p " +
        "WHERE p.adwindowid=$1 and p.adroleid=$2",
   
}
module.exports = sqlQueries;