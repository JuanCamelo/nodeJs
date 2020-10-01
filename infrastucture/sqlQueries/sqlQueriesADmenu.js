const sqlQueries = {
    INSERT_ADMENU:
        "INSERT INTO " +
        "stam.adMenu(name,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5)"+
        "RETURNING adMenu.admenuid",
    
    UPDATE_ADMENU:
        "UPDATE " +
        "stam.adMenu" +
        "SET name=$1,updated=$2,updatedby=$3 " +
        "WHERE adParameterID=$4",
    
   /*  DELETE_ADPARAMETER:
        "DELETE " +
        "FROM stam.adParameter " +
        "where adParameterID=$1", */
    
    /* GET_ADPARAMETER_ID:
        "SELECT p.* " +
        "FROM stam.adParameter p " +
        "WHERE p.adParameterID=$1", */
    
    GET_ADMENU_NAME:
        "SELECT p.* " +
        "FROM stam.adMenu p " +
        "WHERE UPPER(p.name)=$1",

    /* GET_ADPARAMETER_TYPE_VALUE:
        "SELECT p.* " +
        "FROM stam.adParameter p " +
        "WHERE UPPER(p.type)=$1 AND UPPER(p.value)=$2", */
}
module.exports = sqlQueries;