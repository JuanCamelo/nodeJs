const adParameterUpdateDTO = (
    type,
    name,
    value,
    list,
    updatedby,
 ) => {
    if ( type == undefined || type === '' || type == null )
        throw new Error('type is not valid');

    if ( name == undefined || name === '' || name == null )
        throw new Error('name is not valid');
    
    if ( value == undefined || value === '' || value == null )
        throw new Error('value is not valid');
    
    if( list !== true && list !== false )
        throw new Error('list is not valid');
    
    const user = parseInt(updatedby);
    if ( user == undefined || user <= 0 || Number.isNaN(user) ) 
      throw new Error('updatedby is not valid'); 

    return {
        type: type,
        name: name,
        value: value,
        list: list,
        updated: new Date(),
        updatedby: updatedby,
    };
};
module.exports = adParameterUpdateDTO;