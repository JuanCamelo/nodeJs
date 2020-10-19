const adWindowRoleDTO = (    
    adwindowid,
    adroleid,
    isreadwrite,
    isactive,
    createdby
) => {

    
    if ( isactive == undefined || isactive === '' || isactive == null || typeof isactive != "boolean" )
    throw new Error('isactive is not valid'); 

    if ( isreadwrite == undefined || isreadwrite === '' || isreadwrite == null || typeof isreadwrite != "boolean" )
    throw new Error('isreadwrite is not valid');

    const user = parseInt(createdby);
    if (user == undefined || user <= 0 || Number.isNaN(user))
        throw new Error('createdby is not valid');

    return {
        adwindowid: adwindowid,
        adroleid: adroleid,
        isreadwrite:isreadwrite,
        isactive: isactive,
        created: new Date(),
        createdby: createdby,
        updated: null,
        updatedby: null,
    };
};
module.exports = adWindowRoleDTO;