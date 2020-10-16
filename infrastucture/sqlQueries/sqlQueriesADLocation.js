const sqlQueries = {
    INSERT_ADLOCATION:
        "INSERT INTO " +
        "stam.adLocation(adclientid, adcountryid,adregionid,adcityid,name,address1,address2,defaultlocation,postalcode,isactive,description,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) "+
        "RETURNING adLocation.adLocationid",
    
    UPDATE_ADLOCATION:
        "UPDATE " +
        "stam.adLocation " +
        "SET  adcountryid=$1, adregionid=$2, adcityid=$3, name=$4, address1=$5, address2=$6, defaultlocation=$7, postalcode=$8, isactive=$9, description=$10, updated=$11, updatedby=$12 " +
        "WHERE adLocationID=$13",
    
    DELETE_ADLOCATION:
        "DELETE " +
        "FROM stam.adLocation " +
        "where adLocationID=$1", 
    
     GET_ADLOCATION_ID:
        "SELECT p.* " +
        "FROM stam.adLocation p " +
        "WHERE p.adlocationid=$1", 
    
    GET_ADREGION_ADCOUNTRY:
        "SELECT p.* " +
        "FROM stam.adregion p "+
        "WHERE p.adregionid=$1 and p.adcountryid=$2",
    
    GET_ADCITY_ADREGION:
        "SELECT p.* " +
        "FROM stam.adCity p "+
        "WHERE p.adcityid=$1 and p.adregionid=$2"
    
}
module.exports = sqlQueries;