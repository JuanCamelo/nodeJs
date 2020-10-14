const sqlQueries = {
    INSERT_ADWINDOW:
        "INSERT INTO " +
        "stam.adwindow(name,isactive,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6) " +
        "RETURNING adwindowid",
    
    UPDATE_ADWINDOW:
        "UPDATE " +
        "stam.adwindow " +
        "SET name=$1,isactive=$2,updated=$3,updatedby=$4 " +
        "WHERE adwindowid=$5",
    
    DELETE_ADWINDOW:
        "DELETE " +
        "FROM stam.adwindow " +
        "where adwindowid=$1",
    
    GET_ADWINDOW_ID:
        "SELECT p.* " +
        "FROM stam.adwindow p " +
        "WHERE p.adwindowid=$1",
    
    GET_ADWINDOW_NAME:
        "SELECT p.* " +
        "FROM stam.adwindow p " +
        "WHERE UPPER(p.name)=$1",

   
}
module.exports = sqlQueries;