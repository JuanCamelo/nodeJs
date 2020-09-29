const sqlQueries = {
    INSERT_ADPARAMETER:
        "INSERT INTO " +
        "stam.adParameter(type,name,value,list,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6,$7,$8) " +
        "RETURNING adParameter.adParameterID",
    
    UPDATE_ADPARAMETER:
        "UPDATE " +
        "stam.adParameter " +
        "SET type=$1,name=$2,value=$3,list=$4,updated=$5,updatedby=$6 " +
        "WHERE adParameterID=$7",
    
    DELETE_ADPARAMETER:
        "DELETE " +
        "FROM stam.adParameter " +
        "where adParameterID=$1",
    
    GET_ADPARAMETER_ID:
        "SELECT p.* " +
        "FROM stam.adParameter p " +
        "WHERE p.adParameterID=$1",
    
    GET_ADPARAMETER_TYPE_NAME:
        "SELECT p.* " +
        "FROM stam.adParameter p " +
        "WHERE UPPER(p.type)=$1 AND UPPER(p.name)=$2",

    GET_ADPARAMETER_TYPE_VALUE:
        "SELECT p.* " +
        "FROM stam.adParameter p " +
        "WHERE UPPER(p.type)=$1 AND UPPER(p.value)=$2",
}
module.exports = sqlQueries;