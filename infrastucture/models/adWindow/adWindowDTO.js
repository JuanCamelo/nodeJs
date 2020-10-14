const adWindowDTO = (    
    name,
    isactive,
    createdby
) => {

    if (name == undefined || name === '' || name == null)
        throw new Error('name is not valid');
    
    if( isactive !== true && isactive !== false )
        throw new Error('isactive is not valid');

    const user = parseInt(createdby);
    if (user == undefined || user <= 0 || Number.isNaN(user))
        throw new Error('createdby is not valid');

    return {
        name: name,
        isactive: isactive,
        created: new Date(),
        createdby: createdby,
        updated: null,
        updatedby: null,
    };
};
module.exports = adWindowDTO;