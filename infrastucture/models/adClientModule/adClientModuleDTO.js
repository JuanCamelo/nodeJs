const adClientModuleDTO = (    
    admoduleid,
    adclientid,
    isactive,
    createdby
) => {

    const moduleID = parseInt(admoduleid);
    if (moduleID == undefined || moduleID <= 0 || Number.isNaN(moduleID))
        throw new Error('admoduleid is not valid');

    const clientID = parseInt(adclientid);
    if (clientID == undefined || clientID <= 0 || Number.isNaN(clientID))
        throw new Error('adclientid is not valid');
    
    if( isactive !== true && isactive !== false )
        throw new Error('isActive is not valid');

    const user = parseInt(createdby);
    if (user == undefined || user <= 0 || Number.isNaN(user))
        throw new Error('createdby is not valid');

    return {
        admoduleid:admoduleid,
        adclientid: adclientid,
        isactive: isactive,
        created: new Date(),
        createdby: createdby,
        updated: null,
        updatedby: null,
    };
};
module.exports = adClientModuleDTO;