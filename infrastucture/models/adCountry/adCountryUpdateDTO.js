const adCountryUpdateDTO = (
    name,
    language,
    currency,
    taxidtype,
    updatedby
) => {
    if (name == undefined || name === '' || name == null)
        throw new Error('name is not valid');

    if (language == undefined || language === '' || language == null)
        throw new Error('language is not valid');

    if (currency == undefined || currency === '' || currency == null)
        throw new Error('currency is not valid');

    if (taxidtype !== true && taxidtype !== false)
        throw new Error('taxidtype is not valid');


    const user = parseInt(updatedby);
    if (user == undefined || user <= 0 || Number.isNaN(user))
        throw new Error('updatedby is not valid');

    return {
        name: name,
        language: language,
        currency: currency,
        taxidtype: taxidtype,
        updated: new Date(),
        updatedby: updatedby,
    };
};
module.exports = adCountryUpdateDTO;