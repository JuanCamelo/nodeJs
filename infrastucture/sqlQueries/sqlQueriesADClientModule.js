const sqlQueries ={

    INSERT_ADCLIENTMODULE:
        "INSERT INTO " +
        "stam.adclientmodule(admoduleid,adclientid,isactive,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6,$7) " +
        "RETURNING adclientmoduleid",


    UPDATE_ADCLIENTMODULE:
        "UPDATE " +
        "stam.adclientmodule " +
        "SET isactive=$1,updated=$2,updatedby=$3 " +
        "WHERE adclientmoduleid=$4",


    DELETE_ADCLIENTMODULE:
        "DELETE " +
        "FROM stam.adclientmodule " +
        "where adclientmoduleid=$1",


    GET_ADCLIENTMODULEBYID:
        "SELECT p. * " +
        "FROM stam.adclientmodule p " +
        "WHERE p.adclientmoduleid=$1",          


    GET_ADCLIENTBY_MODULEID:
    "SELECT adclientid "+
    "FROM stam.adclient "+
    "WHERE  adclientid =$1",

    GET_ADMODULE_CLIENTBYID:
    "SELECT adclientmoduleid "+
    "FROM stam.adclientmodule "+
    "WHERE admoduleid =$1 "+
    "AND adclientid =$2",
};


module.exports = sqlQueries;