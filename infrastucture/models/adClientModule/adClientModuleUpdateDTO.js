const adClientModuleUpdateDTO = (    
    isactive,
    updatedby
) => {
    
    if( isactive !== true && isactive !== false )
        throw new Error('isactive is not valid');
        

    const user = parseInt(updatedby);
    if (user == undefined || user <= 0 || Number.isNaN(user))
        throw new Error('updatedby is not valid');

    return {
        isactive: isactive,        
        updated: new Date(),
        updatedby: updatedby,
    };
};
module.exports = adClientModuleUpdateDTO;