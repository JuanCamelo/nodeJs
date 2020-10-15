const sqlQueries = {
    INSERT_ADMENUOPTION:
        "INSERT INTO " +
        "stam.adMenuOption(admenuid,name,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6) "+
        "RETURNING adMenuOption.admenuoptionid",
    
    UPDATE_ADMENUOPTION:
        "UPDATE " +
        "stam.adMenuOption " +
        "SET name=$1,updated=$2,updatedby=$3 " +
        "WHERE adMenuOptionID=$4",
    
    DELETE_ADMENUOPTION:
        "DELETE " +
        "FROM stam.adMenuoption " +
        "where adMenuoptionID=$1", 
    
     GET_ADMENUOPTION_ID:
        "SELECT p.* " +
        "FROM stam.adMenuOption p " +
        "WHERE p.adMenuOptionID=$1", 
    
     GET_ADMENUOPTION_ID_NAME:
        "SELECT p.* " +
        "FROM stam.adRole p " +
        "WHERE p.adclientid=$1 and p.name=$2" , 
}
module.exports = sqlQueries;