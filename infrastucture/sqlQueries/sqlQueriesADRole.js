const sqlQueries = {
    INSERT_ADROLE:
        "INSERT INTO " +
        "stam.adRole(admenuid,name,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6) "+
        "RETURNING adMenuOption.admenuoptionid",
    
    UPDATE_ADROLE:
        "UPDATE " +
        "stam.adRole " +
        "SET name=$1,updated=$2,updatedby=$3 " +
        "WHERE adMenuOptionID=$4",
    
    DELETE_ADROLE:
        "DELETE " +
        "FROM stam.adRole " +
        "where adRoleID=$1", 
    
     GET_ADROLE_ID:
        "SELECT p.* " +
        "FROM stam.adRole p " +
        "WHERE p.adRoleID=$1", 
    
     GET_ADROLE_ID_NAME:
        "SELECT p.* " +
        "FROM stam.adRole p " +
        "WHERE p.adclientid=$1 and p.name=$2" , 
}
module.exports = sqlQueries;