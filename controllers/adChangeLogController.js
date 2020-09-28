/*
 Controller used to create  a adchangeLog
 v 0.1
 POST /smchangeLog 
 */
const smChangeLogDTO = require("../infrastucture/models/shChangeLog/smChangeLogDTO");
const smChangeLogCommands = require("../infrastucture/commands/smChangeLog/smChangeLogCommandsModule");
const transactionCommands = require("../infrastucture/commands/transactionCommandsModule");

exports.createSMChangeLog = async (adUserID, action, tableName, recordID, columnName, oldValue, newValue ) => {
    try{
        const record = smChangeLogDTO(
            adUserID,
            action,
            tableName,
            recordID,
            columnName,
            oldValue,
            newValue
        );
        await transactionCommands.beginTransaction();
        await smChangeLogCommands.createSMChangeLog(record);
        await transactionCommands.commitTransaction();
    } catch (error) {
        await transactionCommands.rollbackTransaction();
        throw new Error(error.message);
    }
}
