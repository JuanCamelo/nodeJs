const sqlQueries = {
    INSERT_ADCHANGELOG:
        "INSERT INTO " + 
        "stam.adchangelog(aduserid,date,action,tableName,recordID,columnName,oldValue,newValue) " + 
        "VALUES($1,$2,$3,$4,$5,$6,$7,$8) " +
        "RETURNING adchangelog.adchangelogID",
}
module.exports = sqlQueries;