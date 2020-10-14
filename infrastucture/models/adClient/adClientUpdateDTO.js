const adClientUpdateDTO = (
            adcountryID,
            adTaxIDTypeID,
            name,
            taxID,
            isactive,
            updatedby,
 ) => {

    if ( adcountryID == undefined || adcountryID === '' || adcountryID == null )
        throw new Error('adcountryID is not valid');

    if ( adTaxIDTypeID == undefined || adTaxIDTypeID === '' || adTaxIDTypeID == null )
        throw new Error('adTaxIDTypeID is not valid');

    if ( name == undefined || name === '' || name == null )
        throw new Error('name is not valid');

    if ( taxID == undefined || taxID === '' || taxID == null )
        throw new Error('taxID is not valid');

    if ( isactive == undefined || isactive === '' || isactive == null || typeof isactive !== "boolean" )
        throw new Error('isactive is not valid');
    
    const user = parseInt(updatedby);
    if ( user == undefined || user <= 0 || Number.isNaN(user) ) 
      throw new Error('updatedby is not valid'); 

    return {
        adcountryID,
        adTaxIDTypeID,
        name: name,
        taxID: taxID,
        isactive: isactive,
        updated: new Date(),
        updatedby: updatedby,
    };
};
module.exports = adClientUpdateDTO;