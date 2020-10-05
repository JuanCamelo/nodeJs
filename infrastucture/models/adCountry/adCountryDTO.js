const adCountryDTO = (
    name,
    language,
    currency,
    taxidtype,
    createdby

) => {
    if (name == undefined || name === '' || name == null)
        throw new Error('name is not valid');

    if (language == undefined || language === '' || language == null)
        throw new Error('language is not valid');

    if (currency == undefined || currency === '' || currency == null)
        throw new Error('currency is not valid');

    if (taxidtype !== true && taxidtype !== false)
        throw new Error('list is not valid');

    const user = parseInt(createdby);
    if (user == undefined || user <= 0 || Number.isNaN(user))
        throw new Error('createdby is not valid');

    return {
        name: name,
        language: language,
        currency: currency,
        taxidtype: taxidtype,
        created: new Date(),
        createdby: createdby,
        updated: null,
        updatedby: null,
    };
};
module.exports = adCountryDTO;