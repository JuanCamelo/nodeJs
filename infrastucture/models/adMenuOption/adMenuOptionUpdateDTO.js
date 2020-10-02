const adMenuOptionUpdateDTO = (
    name,
    updatedby,
 ) => {

    if ( name == undefined || name === '' || name == null )
        throw new Error('name is not valid');
    
    const user = parseInt(updatedby);
    if ( user == undefined || user <= 0 || Number.isNaN(user) ) 
      throw new Error('updatedby is not valid'); 

    return {
        name: name,
        updated: new Date(),
        updatedby: updatedby,
    };
};
module.exports = adMenuUpdateDTO;