const adWindowRoleUpdateDTO = (    
    isreadwrite,
    isactive,
    updatedby
) => {

    if ( isreadwrite == undefined || isreadwrite === '' || isreadwrite == null || typeof isreadwrite != "boolean" )
    throw new Error('isreadwrite is not valid');
    
    if ( isactive == undefined || isactive === '' || isactive == null || typeof isactive != "boolean" )
    throw new Error('isactive is not valid');

    const user = parseInt(updatedby);
    if (user == undefined || user <= 0 || Number.isNaN(user))
        throw new Error('updatedby is not valid');

    return {
        isreadwrite: isreadwrite,
        isactive: isactive,        
        updated: new Date(),
        updatedby: updatedby,
    };
};
module.exports = adWindowRoleUpdateDTO;