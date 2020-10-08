/**
 * Controler used to mange adCountry  
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("../controllers/adChangeLogController");

const adCountryCommands = require("../infrastucture/commands/adCountry/adCountryCommandsMudule");
const adCountryQueries = require("../infrastucture/queries/adCountry/adCountryQueriesModule");
const ParameterQueries = require("../infrastucture/queries/adParameter/adParameterQueriesModule");

const adCountryDTO = require("../infrastucture/models/adCountry/adCountryDTO");
const adCountryUpdateDTO = require("../infrastucture/models/adCountry/adCountryUpdateDTO");


/**
 * Create adCountry 
 */
exports.createADCountry = async (req, res, next) => {
    try {
        const record = adCountryDTO(
            req.body.name,
            req.body.language,
            req.body.currency,
            req.body.taxidtype,
            req.body.createdby
        );

        const name = req.body.name.toUpperCase();
        const language = req.body.language.toUpperCase();
        const currency = req.body.currency.toUpperCase();
        const adUserID = req.body.createdby;

        //Validate not exists a record with name
        const valName = await adCountryQueries.getADCountryByName(name);
        if (valName.length > 0)
            throw new Error("Exists a country with the relation name");


        //Validate what exists a type equal language
        const valTypeLanguage = await ParameterQueries.getADParameterByTypeValue('LANGUAGES', language);
        if (valTypeLanguage.length == 0)
            throw new Error("Language not exists");


        //Validate what exists a type equal currency
        const valTypeCurrency = await ParameterQueries.getADParameterByTypeValue('CURRENCIES', currency);
        if (valTypeCurrency.length == 0)
            throw new Error("currency not exists");


        await dbTransaction.beginTransaction();
        const adCountry = await adCountryCommands.createADCountry(record);
        const adCountryID = adCountry[0].adcountryid;
        await changeLog.createADChangeLog(adUserID, "INSERT", "adCountry", adCountryID, null, null, null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adCountryID, 201, "adCountry record created successfully!");

    } catch (error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adCountry not created!", 400, error.message);
    }
}

/**
 * Update adCountry 
 */
exports.updateADCountry = async (req, res, next) => {
    try {
        const adCountryID = req.query.adcountryid;
        const adCountry = await adCountryQueries.getADContryByID(adCountryID);

        //Validate that record exists
        if (adCountry.length == 0)
            throw new Error("adCountry record not exists");

        //Get values to update
        const name = req.body.name !== undefined ? req.body.name : adCountry[0].name;
        const language = req.body.language !== undefined ? req.body.language : adCountry[0].language;
        const currency = req.body.currency !== undefined ? req.body.currency : adCountry[0].currency;
        const taxidtype = req.body.taxidtype !== undefined ? req.body.taxidtype : adCountry[0].taxidtype;
        const adUserID = req.body.updatedby;

        const record = adCountryUpdateDTO(
            name,
            language,
            currency,
            taxidtype,
            adUserID,
        );

        if (name != adCountry[0].name || language != adCountry[0].language || currency != adCountry[0].currency || taxidtype != adCountry[0].taxidtype) {

            await dbTransaction.beginTransaction();


            //Validate not exists a record with same type and name
            if (name != adCountry[0].name) {
                const valName = await adCountryQueries.getADCountryByName(name.toUpperCase());
                if (valName.length > 0)
                    throw new Error("Exists a country with the relation name");
                await changeLog.createADChangeLog(adUserID, "UPDATE", "adCountry", adCountryID, "name", adCountry[0].name, name);
            }


            //Validate what exists a type equal language
            if (language != adCountry[0].language) {
                const valTypeLanguage = await ParameterQueries.getADParameterByTypeValue('LANGUAGES', language.toUpperCase());
                if (valTypeLanguage.length == 0)
                    throw new Error("Language not exists");
                await changeLog.createADChangeLog(adUserID, "UPDATE", "adCountry", adCountryID, "language", adCountry[0].language, language);
            }


            //Validate what exists a type equal currency
            if (currency != adCountry[0].currency) {
                const valTypeCurrency = await ParameterQueries.getADParameterByTypeValue('CURRENCIES', currency.toUpperCase());
                if (valTypeCurrency.length == 0)
                    throw new Error("Currency not exists");
                await changeLog.createADChangeLog(adUserID, "UPDATE", "adCountry", adCountryID, "currency", adCountry[0].currency, currency);
            }

            //record taxidtype in event log
            if (taxidtype != adCountry[0].taxidtype) {
                await changeLog.createADChangeLog(adUserID, "UPDATE", "adCountry", adCountryID, "taxidtype", adCountry[0].taxidtype, taxidtype);
            }

            await adCountryCommands.updateADCountry(record, adCountryID);
            await dbTransaction.commitTransaction();
        }

        response.success(req, res, adCountryID, 201, "adCountry record updated successfully!");

    } catch (error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adCountry not updated!", 400, error.message);
    }
};

/**
 * Delete adCountry 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteADCountry = async (req, res, next) => {
    try {
        const adCountryID = req.query.adcountryid;
        const adCountry = await adCountryQueries.getADContryByID(adCountryID);

        //Validate that record exists
        if (adCountry.length == 0)
            throw new Error("countryid record not exists");

        const adUserID = parseInt(req.query.deletedby);
        if (Number.isNaN(adUserID))
            throw new Error("deletedBy is not valid");

        await dbTransaction.beginTransaction();
        await adCountryCommands.deleteADCountry(adCountryID);
        await changeLog.createADChangeLog(adUserID, "DELETE", "adCountry", adCountryID, null, null, null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adCountryID, 201, "adCountry record deleted successfully!");

    } catch (error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adCountry not delete!", 400, error.message);
    }
}

/**
 * Get adCountry 
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADCountry = async (req, res, next) => {
    try {
        const adcountryid = req.query.adcountryid != null ? req.query.adcountryid : "p.adcountryid";
        const name = req.query.name != null ? "'" + req.query.name + "'" : "p.name";
        const language = req.query.language != null ? "'" + req.query.language + "'" : "p.language"
        const currency = req.query.currency != null ? "'" + req.query.currency + "'" : "p.currency";
        const taxidtype = req.query.taxidtype != null ? req.query.taxidtype : "p.taxidtype";

        const adCountrys = await adCountryQueries.getADCountry(adcountryid, name, language, currency, taxidtype);
        response.success(req, res, adCountrys, 200, adCountrys.length);

    } catch (error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adCountrys not exists!", 400, error.message);
    }
}