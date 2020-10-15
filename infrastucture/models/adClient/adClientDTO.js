const AdClientDTO = (
    adclientgroupid,
    adcountryid,
    adtaxidtypeid,
    name,
    taxid,
    isactive,
    createdby,
 ) => {

    if ( adclientgroupid == undefined || adclientgroupid === '' || adclientgroupid == null )
        throw new Error('adclientgroupid is not valid');
    
    if ( adcountryid == undefined || adcountryid === '' || adcountryid == null )
        throw new Error('adcountryid is not valid'); 
     
    if ( adtaxidtypeid == undefined || adtaxidtypeid === '' || adtaxidtypeid == null )
        throw new Error('adtaxidtypeid is not valid');     

    if ( name == undefined || name === '' || name == null )
        throw new Error('name is not valid');
    
    if ( taxid == undefined || taxid === '' || taxid == null )
        throw new Error('taxid is not valid');    

    if ( isactive == undefined || isactive === '' || isactive == null || typeof isactive != "boolean" )
        throw new Error('isactive is not valid');
    
    const user = parseInt(createdby);
    if ( user === undefined || user === null || user <= 0 || Number.isNaN(user) ) 
      throw new Error('createdby is not valid'); 

    return {
        adclientgroupid:adclientgroupid,
        adcountryid:adcountryid,
        adtaxidtypeid:adtaxidtypeid,
        name: name,
        taxid:taxid,
        isactive: isactive,
        created: new Date(),
        createdby: createdby,
        updated: null,
        updatedby: null,
    };
};
module.exports = AdClientDTO;