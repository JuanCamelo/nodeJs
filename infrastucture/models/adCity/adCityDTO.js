const adCityDTO = (
    adregionid,
    name,    
    createdby
) => {
    const city = parseInt(adregionid);
    if (city == undefined || city <= 0 || Number.isNaN(city))
        throw new Error('adregionid is not valid');

    if (name == undefined || name === '' || name == null)
        throw new Error('name is not valid');
    
    const user = parseInt(createdby);
    if (user == undefined || user <= 0 || Number.isNaN(user))
        throw new Error('createdby is not valid');

    return {
        adregionid: adregionid,
        name: name,
        created: new Date(),
        createdby: createdby,
        updated: null,
        updatedby: null,
    };
};
module.exports = adCityDTO;