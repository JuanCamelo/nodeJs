const adWindowUpdateDTO = (    
    name,
    isactive,
    updatedby
) => {

    if (name == undefined || name === '' || name == null)
        throw new Error('name is not valid');
    
    if( isactive !== true && isactive !== false )
        throw new Error('isactive is not valid');

    const user = parseInt(updatedby);
    if (user == undefined || user <= 0 || Number.isNaN(user))
        throw new Error('updatedby is not valid');

    return {
        name: name,
        isactive: isactive,        
        updated: new Date(),
        updatedby: updatedby,
    };
};
module.exports = adWindowUpdateDTO;