const sqlQueries = {
    INSERT_ADROLE:
        "INSERT INTO " +
        "stam.adRole(adclientid,name,isactive,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6,$7) "+
        "RETURNING adRole.adroleid",
    
    UPDATE_ADROLE:
        "UPDATE " +
        "stam.adRole " +
        "SET name=$1, isactive=$2, updated=$3,updatedby=$4 " +
        "WHERE adRoleID=$5",
    
    DELETE_ADROLE:
        "DELETE " +
        "FROM stam.adRole " +
        "where adRoleID=$1", 
    
     GET_ADROLE_ID:
        "SELECT p.* " +
        "FROM stam.adRole p " +
        "WHERE p.adroleid=$1", 
    
     GET_ADROLE_ID_NAME:
        "SELECT p.* " +
        "FROM stam.adRole p " +
        "WHERE p.adclientid=$1 and p.name=$2 and p.adroleid<>$3" , 

    GET_ADROLE_IDCLIENT_NAME:
        "SELECT p.* " +
        "FROM stam.adRole p " +
        "WHERE p.adclientid=$1 and p.name=$2" 
}
module.exports = sqlQueries;