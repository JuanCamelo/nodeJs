/**
 * Controler used to mange adCity 
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("../controllers/adChangeLogController");

const adCityCommands = require("../infrastucture/commands/adCity/adCityCommandsModule");

const adCityQueries = require("../infrastucture/queries/adCity/getADCityQueriesModule");

const adCityDTO = require("../infrastucture/models/adCity/adCityDTO");
const adCityUpdateDTO = require("../infrastucture/models/adCity/adCityUpdateDTO");


/**
 * Create adCity
 */
exports.createadCity = async (req, res, next) => {
    try {
        const record = adCityDTO(
            req.body.adregionid,
            req.body.name,
            req.body.createdby
        );

        const name = req.body.name.toUpperCase();
        const adCityID = req.body.adregionid
        const adUserID = req.body.createdby;

        //validate exists a record with the adCity received
        const valCityId = await adCityQueries.getADCityRegionID(adCityID);
        if (valCityId.length == 0)
            throw new Error("adregionid record not exist");

        //Validate not exists a record with same name and adcityid
        const validIDName = await adCityQueries.getCityNameByID(adCityID, name);
        if (validIDName.length >= 1)
            throw new Error("Exists is a record with the same name and adregionid");

        await dbTransaction.beginTransaction();
        const adCity = await adCityCommands.createADCity(record);
        const adcityID = adCity[0].adcityid;
        await changeLog.createADChangeLog(adUserID, "INSERT", "adCity", adcityID, null, null, null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adcityID, 201, "City record created successfully!");

    } catch (error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "City not created!", 400, error.message);
    }
}

/**
 * Update adCity
 */
exports.updateadCity = async (req, res, next) => {
    try {
        const AdCityID = req.query.adcityid;
        const ADCity = await adCityQueries.getADCityByID(AdCityID);

        //Validate that record exists
        if (ADCity.length == 0)
            throw new Error("adcityid record not exists");

        //Get values to update
        const adregionid = req.body.adregionid !== undefined ? req.body.adregionid : ADCity[0].adregionid;
        const name = req.body.name !== undefined ? req.body.name : ADCity[0].name;
        const adUserID = req.body.updatedby;

        const record = adCityUpdateDTO(
            adregionid,
            name,
            adUserID,
        );

        if (name != ADCity[0].name || adregionid != ADCity[0].adregionid) {
            await dbTransaction.beginTransaction();

            //Validate not exists a record with same type and name
            if (name != ADCity[0].name) {
                const validIDName = await adCityQueries.getCityNameByID(adregionid, name.toUpperCase());
                if (validIDName.length >= 1)
                    throw new Error("Exists is a record with the same name and adregionid");
                await changeLog.createADChangeLog(adUserID, "UPDATE", "adCity", AdCityID, "name", ADCity[0].name, name);
            };

            //validate exists a record with the adregionid received
            if (adregionid != ADCity[0].adregionid) {
                const valCityId = await adCityQueries.getADCityRegionID(adregionid);
                if (valCityId.length == 0)
                    throw new Error("adregionid record not exist");
                await changeLog.createADChangeLog(adUserID, "UPDATE", "adCity", AdCityID, "adregionid", ADCity[0].adregionid, adregionid);
            };

            await adCityCommands.updateADCity(record, AdCityID);
            await dbTransaction.commitTransaction();
        };

        response.success(req, res, AdCityID, 201, "adCity record updated successfully!");

    } catch (error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adCity not updated!", 400, error.message);
    }
};

/**
 * Delete adCity
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteadCity = async (req, res, next) => {
    try {
        const adCityID = req.query.adcityid;
        const adCity = await adCityQueries.getADCityByID(adCityID);

        //Validate that record exists
        if (adCity.length == 0)
            throw new Error("idCity record not exists");

        const adUserID = parseInt(req.query.deletedby);
        if (Number.isNaN(adUserID))
            throw new Error("deletedBy is not valid");

        await dbTransaction.beginTransaction();
        await adCityCommands.deleteADCity(adCityID);
        await changeLog.createADChangeLog(adUserID, "DELETE", "adCity", adCityID, null, null, null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adCityID, 201, "City record deleted successfully!");

    } catch (error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "City not deleted!", 400, error.message);
    };
};

/**
 * Get adCity
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getadCity = async (req, res, next) => {
    try {

        const adcityid = req.query.adcityid != null ? req.query.adcityid : "p.adcityid";
        const name = req.query.name != null ? "'" + req.query.name + "'" : "p.name";
        const adregionid = req.query.adregionid != null ? "'" + req.query.adregionid + "'" : "p.adregionid"

        const adCitys = await adCityQueries.getADCity(adcityid, name, adregionid);
        response.success(req, res, adCitys, 200, adCitys.length);

    } catch (error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adCity not exists!", 400, error.message);
    }
}