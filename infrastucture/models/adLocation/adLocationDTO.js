const AdLocationDTO = (
    adclientid,
    adcountryid,
    adregionid,
    adcityid,
    name,
    address1,
    address2,
    defaultlocation,
    postalcode,
    isactive,
    description,
    createdby
 ) => {

    if ( name == undefined || name === '' || name == null )
        throw new Error('name is not valid');
    
    if ( address1 == undefined || address1 === '' || address1 == null )
        throw new Error('address1 is not valid');
        
    if ( address2 == undefined || address2 === '' || address2 == null )
        throw new Error('address2 is not valid');
    
    if ( defaultlocation == undefined || defaultlocation === '' || defaultlocation == null || typeof defaultlocation != "boolean" )
        throw new Error('defaultlocation is not valid');
    
    if ( postalcode == undefined || postalcode === '' || postalcode == null )
        throw new Error('postalcode is not valid');

    if ( isactive == undefined || isactive === '' || isactive == null || typeof isactive != "boolean" )
        throw new Error('isactive is not valid');  
    
    if ( description == undefined || description === '' || description == null )
        throw new Error('description is not valid');
    
    const user = parseInt(createdby);
    if ( user === undefined || user === null || user <= 0 || Number.isNaN(user) ) 
      throw new Error('createdby is not valid'); 

    return {
        
        adclientid: adclientid,
        adcountryid: adcountryid,
        adregionid: adregionid,
        adcityid: adcityid,
        name: name.toLowerCase(),
        address1: address1.toLowerCase(),
        address2: address2.toLowerCase(),
        defaultlocation: defaultlocation,
        postalcode: postalcode.toLowerCase(),
        isactive: isactive,
        description: description.toLowerCase(),
        created: new Date(),
        createdby: createdby,
        updated: null,
        updatedby: null,
    };
};
module.exports = AdLocationDTO;