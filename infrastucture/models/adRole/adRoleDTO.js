const AdRoleDTO = (
    adclientid,
    name,
    isactive,
    createdby,
 ) => {

    if ( name == undefined || name === '' || name == null )
        throw new Error('name is not valid');

    if ( isactive == undefined || isactive === '' || isactive == null || typeof isactive != "boolean" )
        throw new Error('isactive is not valid');    
    
    const user = parseInt(createdby);
    if ( user === undefined || user === null || user <= 0 || Number.isNaN(user) ) 
      throw new Error('createdby is not valid'); 

    return {
        
        adclientid:adclientid,
        name: name.toLowerCase(),
        isactive: isactive,
        created: new Date(),
        createdby: createdby,
        updated: null,
        updatedby: null,
    };
};
module.exports = AdRoleDTO;