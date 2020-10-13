const sqlQueries = {
    INSERT_ADMODULE:
        "INSERT INTO " +
        "stam.admodule(name,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5) " +
        "RETURNING admoduleid",

    UPDATE_ADMODULE:
        "UPDATE " +
        "stam.admodule " +
        "SET name=$1, updated=$2,updatedby=$3 " +
        "WHERE admoduleid=$4",

    DELETE_ADMODULE:
        "DELETE " +
        "FROM stam.admodule " +
        "WHERE admoduleid=$1",
   
    GET_ADMODULENAMEBY_ID:
        "SELECT p.* " +
        "FROM stam.admodule p " +
        "WHERE UPPER(p.name)=$1",

    
    GET_ADMODULEBY_ID:
        "SELECT p.* " +
        "FROM stam.admodule p " +
        "WHERE admoduleid=$1",


}
module.exports = sqlQueries;