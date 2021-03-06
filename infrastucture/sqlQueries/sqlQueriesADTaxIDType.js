const sqlQueries = {
    INSERT_ADTAXIDTYPE:
        "INSERT INTO " +
        "stam.adTaxIDType(adcountryid,code,name,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6,$7) "+
        "RETURNING adTaxIDType.adtaxidtypeid",
    
     UPDATE_ADTAXIDTYPE:
        "UPDATE " +
        "stam.adTaxIDType " +
        "SET code=$1, name=$2, updated=$3, updatedby=$4 " +
        "WHERE adtaxidtypeid=$5", 
    
    DELETE_ADTAXIDTYPE:
        "DELETE " +
        "FROM stam.adTaxIDType " +
        "where adTaxIDTypeid=$1",  
    
     GET_ADTAXIDTYPE_ID:
        "SELECT p.* " +
        "FROM stam.adTaxIDType p " +
        "WHERE p.adtaxidtypeid=$1",  
     
     GET_ADTAXIDTYPE_IDCOUNTRY_NAME:
        "SELECT p.* " +
        "FROM stam.adTaxIDType p " +
        "WHERE p.adcountryid=$1 and p.name=$2" ,  
    
    GET_ADTAXIDTYPE_IDCOUNTRY_CODE:
        "SELECT p.* " +
        "FROM stam.adTaxIDType p " +
        "WHERE p.adcountryid=$1 and p.code=$2" ,
      
        
     GET_ADTAXIDTYPE_ID_NAME:
        "SELECT p.* " +
        "FROM stam.adTaxIDType p " +
        "WHERE p.adcountryid=$1 and p.name=$2 and p.adtaxidtypeid<>$3" , 

     GET_ADTAXIDTYPE_ID_CODE:
        "SELECT p.* " +
        "FROM stam.adTaxIDType p " +
        "WHERE p.adcountryid=$1 and p.code=$2 and p.adtaxidtypeid<>$3" ,
}
module.exports = sqlQueries;