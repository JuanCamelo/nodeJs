const sqlQueries = {
    INSERT_ADPROCESSROLE:
        "INSERT INTO " +
        "stam.adprocessrole(adprocessid,adroleid,isactive,created,createdby,updated,updatedby) " +
        "VALUES($1,$2,$3,$4,$5,$6,$7) " +
        "RETURNING adprocessroleid",

    UPDATE_ADPROCESSROLE:
        "UPDATE " +
        "stam.adprocessrole " +
        "SET isactive=$1, updated=$2,updatedby=$3 " +
        "WHERE adprocessroleid=$4",

    DELETE_ADPROCESSROLE:
        "DELETE " +
        "FROM stam.adprocessrole " +
        "where adprocessroleid=$1",

    GET_ADPROCESSROLEBYID:
        "SELECT p. * " +
        "FROM stam.adprocessrole p " +
        "WHERE p.adprocessroleid =$1",


    GET_ADPROCESSROLEBY_PROCESSROLE:
        "SELECT adprocessid,adroleid " +
        "FROM stam.adprocessrole  " +
        "WHERE adprocessid =$1"+
        "AND adroleid =$2",
  


}
module.exports = sqlQueries;