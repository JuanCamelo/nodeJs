const sqlQueries = {
    INSERT_ADCITY:
        "INSERT INTO " +
        "stam.adcity(adregionid,name,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6) " +
        "RETURNING adcityid",

    UPDATE_ADCITY:
        "UPDATE " +
        "stam.adcity " +
        "SET adregionid=$1, name=$2, updated=$3,updatedby=$4 " +
        "WHERE adcityid=$5",

    DELETE_ADCITY:
        "DELETE " +
        "FROM stam.adcity " +
        "where adcityid=$1",


    GET_ADCITY_ID:
        "SELECT p. * " +
        "FROM stam.adcity p " +
        "WHERE p.adcityid =$1",


    GET_ADCITY_REGION:
        "SELECT p.* " +
        "FROM stam.adcity p " +
        "WHERE p.adregionid=$1 and UPPER(p.name)=$2",


}
module.exports = sqlQueries;