const sqlQueries = {
    INSERT_ADCLIENTGROUP:
        "INSERT INTO " +
        "stam.adClientGroup(name,isactive,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6)"+
        "RETURNING adClientGroup.adclientgroupid",
    
    UPDATE_ADCLIENTGROUP:
        "UPDATE " +
        "stam.adClientGroup " +
        "SET name=$1, isactive=$2, updated=$3,updatedby=$4 " +
        "WHERE adClientGroupID=$5",
    
    DELETE_ADCLIENTGROUP:
        "DELETE " +
        "FROM stam.adClientGroup " +
        "where adClientGroupID=$1", 
    
    GET_ADCLIENTGROUP:
        "SELECT p.* " +
        "FROM stam.adClientGroup p " +
        "WHERE p.adClientGroupID=$1",
    
     GET_ADCLIENTGROUP_ID:
        "SELECT p.* " +
        "FROM stam.adclientgroup p " +
        "WHERE p.adclientgroupid=$1",   
    
    GET_ADCLIENTGROUP_NAME:
        "SELECT p.* " +
        "FROM stam.adClientGroup p " +
        "WHERE p.name=$1", 
   
}
module.exports = sqlQueries;