const sqlQueries = {
    INSERT_ADREGION:
        "INSERT INTO " +
        "stam.adregion(adcountryid,name,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6) " +
        "RETURNING adregionid",

    UPDATE_ADREGION:
        "UPDATE " +
        "stam.adregion " +
        "SET adcountryid=$1, name=$2, updated=$3,updatedby=$4 " +
        "WHERE adregionid=$5",

    DELETE_ADREGION:
        "DELETE " +
        "FROM stam.adregion " +
        "where adregionid=$1",


    GET_ADREGION_ID:
        "SELECT p. * " +
        "FROM stam.adregion p " +
        "WHERE p.adregionid =$1",


    GET_ADREGION_COUNTYIDNAME:
        "SELECT p.* " +
        "FROM stam.adregion p " +
        "WHERE p.adcountryid=$1 and UPPER(p.name)=$2",


}
module.exports = sqlQueries;