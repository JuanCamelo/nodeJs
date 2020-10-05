const sqlQueries = {
    INSERT_ADCOUNTRY:
        "INSERT INTO " +
        "stam.adcountry(name,language,currency,taxidtype,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6,$7,$8) " +
        "RETURNING adcountryid",

    UPDATE_ADCOUNTRY:
        "UPDATE " +
        "stam.adcountry " +
        "SET name=$1,language=$2,currency=$3,taxidtype=$4,updated=$5,updatedby=$6 " +
        "WHERE adcountryid=$7",

    DELETE_ADPARAMETER:
        "DELETE " +
        "FROM stam.adcountry " +
        "where adcountryid=$1",


    GET_ADCUNTRY_ID:
        "SELECT p. * " +
        "FROM stam.adcountry p " +
        "WHERE p.adcountryid =$1",

    GET_ADCOUNTRY_TYPE_NAME:
        "SELECT name  " +
        " FROM stam.adcountry " +
        " WHERE UPPER(name)=$1 "

}
module.exports = sqlQueries;