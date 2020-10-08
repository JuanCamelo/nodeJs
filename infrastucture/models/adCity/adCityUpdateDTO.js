const adCityDTO = (
    adregionid,
    name,   
    updatedby
) => {
    const city = parseInt(adregionid);
    if (city == undefined || city <= 0 || Number.isNaN(city))
        throw new Error('adregionid is not valid');

    if (name == undefined || name === '' || name == null)
        throw new Error('name is not valid');
    
    const user = parseInt(updatedby);
    if (user == undefined || user <= 0 || Number.isNaN(user))
        throw new Error('updatedby is not valid');

    return {
        adregionid: adregionid,
        name: name,               
        updated: new Date(),
        updatedby: updatedby,
    };
};
module.exports = adCityDTO;