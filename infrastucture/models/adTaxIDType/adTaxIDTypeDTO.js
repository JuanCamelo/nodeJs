const adTaxIDTypeDTO = (
    adcountryid,
    code,
    name,
    createdby,
 ) => {

    if ( name == undefined || name === '' || name == null )
        throw new Error('name is not valid');
    
    if (code == undefined || code === '' || code == null)
        throw new Error('code is not valid');

    
    const user = parseInt(createdby);
    if ( user === undefined || user === null || user <= 0 || Number.isNaN(user) ) 
      throw new Error('createdby is not valid'); 

    return {
        
        adcountryid:adcountryid,
        code: code.toUpperCase(),
        name: name.toUpperCase(),
        created: new Date(),
        createdby: createdby,
        updated: null,
        updatedby: null,
    };
};
module.exports = adTaxIDTypeDTO;