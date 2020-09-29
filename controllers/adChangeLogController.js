/*
 Controller used to create  a adchangeLog
 v 0.1
 POST /smchangeLog 
 */

const adChangeLogCommands = require("../infrastucture/commands/adChangeLog/adChangeLogCommandsModule");

const adChangeLogDTO = require("../infrastucture/models/adChangeLog/adChangeLogDTO");

exports.createADChangeLog = async (adUserID, action, tableName, recordID, columnName, oldValue, newValue ) => {
    try{
        const record = adChangeLogDTO(
            adUserID,
            action,
            tableName,
            recordID,
            columnName,
            oldValue,
            newValue
        );
        await adChangeLogCommands.createADChangeLog(record);
    } catch (error) {
        await transactionCommands.rollbackTransaction();
        throw new Error(error.message);
    }
}
