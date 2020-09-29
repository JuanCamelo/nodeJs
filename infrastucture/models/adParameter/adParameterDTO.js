const adParameterDTO = (
    type,
    name,
    value,
    list,
    createdby,
 ) => {
    if ( type == undefined || type === '' || type == null )
        throw new Error('type is not valid');

    if ( name == undefined || name === '' || name == null )
        throw new Error('name is not valid');
    
    if ( value == undefined || value === '' || value == null )
        throw new Error('value is not valid');
    
    if( list !== true && list !== false )
        throw new Error('list is not valid');
    
    const user = parseInt(createdby);
    if ( user == undefined || user <= 0 || Number.isNaN(user) ) 
      throw new Error('createdby is not valid'); 

    return {
        type: type,
        name: name,
        value: value,
        list: list,
        created: new Date(),
        createdby: createdby,
        updated: null,
        updatedby: null,
    };
};
module.exports = adParameterDTO;