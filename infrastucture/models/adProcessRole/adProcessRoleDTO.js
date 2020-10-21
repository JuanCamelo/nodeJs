const adProcessRoleDTO = (    
    adprocessid,
    adroleid,
    isactive,
    createdby
) => {

    const Idadprocess = parseInt(adprocessid);
    if (Idadprocess == undefined || Idadprocess <= 0 || Number.isNaN(Idadprocess))
        throw new Error('adprocessid is not valid');

    const IDadrole = parseInt(adroleid);
    if (IDadrole == undefined || IDadrole <= 0 || Number.isNaN(IDadrole))
        throw new Error('adroleid is not valid');
    
    if( isactive !== true && isactive !== false )
        throw new Error('isactive is not valid');

    const user = parseInt(createdby);
    if (user == undefined || user <= 0 || Number.isNaN(user))
        throw new Error('createdby is not valid');

    return {
        adprocessid: adprocessid,
        adroleid: adroleid,
        isactive: isactive,
        created: new Date(),
        createdby: createdby,
        updated: null,
        updatedby: null,
    };
};
module.exports = adProcessRoleDTO;