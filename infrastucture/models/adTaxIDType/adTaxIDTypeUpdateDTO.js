const adTaxIDTypeUpdateDTO = (
    code,
    name,
    updatedby,
 ) => {

    if ( code == undefined || code === '' || code == null )
    throw new Error('code is not valid');

    if ( name == undefined || name === '' || name == null )
        throw new Error('name is not valid');
    
    const user = parseInt(updatedby);
    if ( user == undefined || user <= 0 || Number.isNaN(user) ) 
      throw new Error('updatedby is not valid'); 

    return {
        code: code.toUpperCase(),
        name: name.toUpperCase(),
        updated: new Date(),
        updatedby: updatedby,
    };
};
module.exports = adTaxIDTypeUpdateDTO;