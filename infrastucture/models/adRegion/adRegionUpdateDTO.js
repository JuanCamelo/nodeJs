const adRegionUpdateDTO = (   
    adcountryid,
    name,
    updatedby
 ) => {

    const country = parseInt(adcountryid);
    if ( country == undefined || country <= 0 || Number.isNaN(country) ) 
      throw new Error('adcountryid is not valid');
    
    if ( name == undefined || name === '' || name == null )
        throw new Error('name is not valid');

    const user = parseInt(updatedby);
        if ( user == undefined || user <= 0 || Number.isNaN(user) ) 
          throw new Error('updatedby is not valid');
        
    return {
        adcountryid:adcountryid,
        name: name,      
        updated: new Date(),
        updatedby: updatedby,
    };
};
module.exports = adRegionUpdateDTO;