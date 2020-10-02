const AdMenuOptionDTO = (
    admenuid,
    name,
    createdby,
 ) => {

    if ( name == undefined || name === '' || name == null )
        throw new Error('name is not valid');
    
    const user = parseInt(createdby);
    if ( user === undefined || user === null || user <= 0 || Number.isNaN(user) ) 
      throw new Error('createdby is not valid'); 

    return {
        name: name,
        admenuid:admenuid,
        created: new Date(),
        createdby: createdby,
        updated: null,
        updatedby: null,
    };
};
module.exports = AdMenuDTO;