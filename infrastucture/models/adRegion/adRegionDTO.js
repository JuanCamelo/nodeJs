const adRegionDTO = (
    adcountryid,
    name,
    createdby
) => {
    const country = parseInt(adcountryid);
    if (country == undefined || country <= 0 || Number.isNaN(country))
        throw new Error('adcountryid is not valid');

    if (name == undefined || name === '' || name == null)
        throw new Error('name is not valid');

    const user = parseInt(createdby);
    if (user == undefined || user <= 0 || Number.isNaN(user))
        throw new Error('createdby is not valid');

    return {
        adcountryid: adcountryid,
        name: name,
        created: new Date(),
        createdby: createdby,
        updated: null,
        updatedby: null,
    };
};
module.exports = adRegionDTO;