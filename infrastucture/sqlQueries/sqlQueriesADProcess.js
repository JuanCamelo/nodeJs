const sqlQueries = {
    INSERT_ADPROCESS:
        "INSERT INTO " +
        "stam.adProcess(name,description,isactive,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6,$7) " +
        "RETURNING adprocesid",

    UPDATE_ADPROCESS:
        "UPDATE " +
        "stam.adprocess " +
        "SET name=$1, description=$2, isactive=$3, updated=$4,updatedby=$5 " +
        "WHERE adprocesid=$6",

    DELETE_ADPROCESS:
        "DELETE " +
        "FROM stam.adprocess " +
        "where adprocesid=$1",

    GET_ADPROCESSBYID:
        "SELECT p. * " +
        "FROM stam.adprocess p " +
        "WHERE p.adprocesid =$1",


    GET_ADPROCESS_NAMEBYID:
        "SELECT p. * " +
        "FROM stam.adprocess p " +
        "WHERE p.name =$1",


    GET_ADPROCESS_NAMEBYID:
        "SELECT p.* " +
        "FROM stam.adprocess p " +
        "WHERE UPPER(p.name)=$1",


}
module.exports = sqlQueries;