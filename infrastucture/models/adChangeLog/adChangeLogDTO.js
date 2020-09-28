const smChangeLogDTO = (
    adUserID,
    action,
    tableName,
    recordID,
    columnName,
    oldValue,
    newValue
 ) => {
    const user = parseInt(adUserID);
    if ( user == undefined || user <= 0 || Number.isNaN(user) ) 
      throw new Error('adUserID is not valid'); 

    var actions = ["INSERT","UPDATE","DELETE"];
    if( actions.includes(action) === false )
        throw new Error('action is not valid');

    if ( tableName == undefined || tableName === '' || tableName == null )
        throw new Error('tableName is not valid');
    
    const record = parseInt(recordID);
    if ( record == undefined || record <= 0 || Number.isNaN(record) )
        throw new Error('recordID is not valid');
    
    if( action === 'UPDATE' ) {
        if ( columnName == undefined || columnName === '' || columnName == null )
            throw new Error('columnName is not valid');
    }

    return {
        adUserID: adUserID,
        date: new Date(),
        action: action,
        tableName: tableName,
        recordID: recordID,
        columnName: columnName,
        oldValue: oldValue,
        newValue: newValue,
    };
};
module.exports = smChangeLogDTO;