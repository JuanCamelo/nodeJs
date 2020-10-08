const sqlQueries = {
    INSERT_ADMODULE:
        "INSERT INTO " +
        "stam.admodule(name,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5) " +
        "RETURNING admoduleid",

    UPDATE_ADMODULE:
        "UPDATE " +
        "stam.adregion " +
        "SET adcountryid=$1, name=$2, updated=$3,updatedby=$4 " +
        "WHERE adregionid=$5",

    DELETE_ADMODULE:
        "DELETE " +
        "FROM stam.adregion " +
       "where adregionid=$1",
   
    GET_ADMODULEBY_ID:
        "SELECT p.* " +
        "FROM stam.admodule p " +
        "WHERE UPPER(p.name)=$1",


}
module.exports = sqlQueries;