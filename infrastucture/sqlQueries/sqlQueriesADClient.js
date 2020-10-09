const sqlQueries = {
    INSERT_ADCLIENT:
        "INSERT INTO " +
        "stam.adClient(adclientgroupid,adcountryid,adtaxidtypeid,name,taxid,isactive,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) "+
        "RETURNING adClient.adclientid",
    
    UPDATE_ADCLIENT:
        "UPDATE " +
        "stam.adClient " +
        "SET name=$1, isactive=$2, updated=$3,updatedby=$4 " +
        "WHERE adClientID=$5",
    
    DELETE_ADCLIENT:
        "DELETE " +
        "FROM stam.adClient " +
        "where adClientID=$1", 
    
    GET_ADCLIENT:
        "SELECT p.* " +
        "FROM stam.adClient p " +
        "WHERE p.adClientID=$1",
    
     GET_ADCLIENT_ID:
        "SELECT p.* " +
        "FROM stam.adclient p " +
        "WHERE p.adclientid=$1",   
    
    GET_ADCLIENT_NAME:
        "SELECT p.* " +
        "FROM stam.adClient p " +
        "WHERE p.name=$1", 
   
}
module.exports = sqlQueries;