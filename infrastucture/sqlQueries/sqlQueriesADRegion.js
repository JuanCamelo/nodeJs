const sqlQueries = {
    INSERT_ADREGION:
        "INSERT INTO " +
        "stam.adregion(adcountryid,name,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6) " +
        "RETURNING adregionid",

    UPDATE_ADREGION:
        "",

    DELETE_ADDELETE:
        "",


    GET_ADREGION_ID:
        "SELECT p. * " +
        "FROM stam.adregion p " +
        "WHERE stam.adregion =$1",
    
     
    GET_ADREGION_COUNTYIDNAME:
        "SELECT p.* " +
        "FROM stam.adregion p " +
        "WHERE p.adcountryid=$1 and UPPER(p.name)=$2" , 


}
module.exports = sqlQueries;