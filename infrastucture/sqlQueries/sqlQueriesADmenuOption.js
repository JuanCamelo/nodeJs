const sqlQueries = {
    INSERT_ADMENUOPTION:
        "INSERT INTO " +
        "stam.adMenuOption(admenuid,name,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6) "+
        "RETURNING adMenuOption.admenuoptionid",
    
   /*  UPDATE_ADMENU:
        "UPDATE " +
        "stam.adMenu " +
        "SET name=$1,updated=$2,updatedby=$3 " +
        "WHERE adMenuID=$4", */
    
    /* DELETE_ADMENU:
        "DELETE " +
        "FROM stam.adMenu " +
        "where adMenuID=$1", */ 
    
   /*  GET_ADMENU_ID:
        "SELECT p.* " +
        "FROM stam.adMenu p " +
        "WHERE p.adMenuID=$1", */
    
   /*  GET_ADMENU_NAME:
        "SELECT p.* " +
        "FROM stam.adMenu p " +
        "WHERE UPPER(p.name)=$1", */
   
        GET_ADMENU_ID_NAME:
        "SELECT p.* " +
        "FROM stam.adMenuOption p " +
        "WHERE p.adMenuID=$1 and p.name=$2" , 
}
module.exports = sqlQueries;