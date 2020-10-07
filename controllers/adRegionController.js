/**
 * Controler used to mange adRegion 
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("../controllers/adChangeLogController");

const adRegionCommands = require("../infrastucture/commands/adRegion/adRegionCommandsModule");

const adRegionQueries = require("../infrastucture/queries/adregion/getRegionQueriesModule");

const adRegionDTO = require("../infrastucture/models/adRegion/adRegionDTO");
const adRegionUpdateDTO = require("../infrastucture/models/adRegion/adRegionUpdateDTO");


/**
 * Create adregion
 */
exports.createADRegion = async (req, res, next) => {
    try {
        const record = adRegionDTO(
            req.body.adcountryid,
            req.body.name,
            req.body.createdby
        );

        const name = req.body.name.toUpperCase();
        const adCountyID = req.body.adcountryid
        const adUserID = req.body.createdby;

        //validate exists a record with the adcountryid received
        const valCountryId = await adRegionQueries.getADRegionCountyID(adCountyID);
        if (valCountryId.length == 0)
            throw new Error("adcountryid record not exist");

        //Validate not exists a record with same name and adcountryid
        const validIDName = await adRegionQueries.getADRegionNameCountryID(adCountyID, name);
        if (validIDName.length >= 1)
            throw new Error("Exists a record with the same name and adcountryid");

        await dbTransaction.beginTransaction();
        const ADRegion = await adRegionCommands.createADRegion(record);
        const AdRegionID = ADRegion[0].adregionid;
        await changeLog.createADChangeLog(adUserID, "INSERT", "AdRegion", AdRegionID, null, null, null);
        await dbTransaction.commitTransaction();

        response.success(req, res, AdRegionID, 201, "adRegion record created successfully!");

    } catch (error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adRegion not created!", 400, error.message);
    }
}

/**
 * Update ADRegion
 */
exports.updateADRegion = async (req, res, next) => {
    try {
        const AdRegionID = req.query.adregionid;
        const ADRegion = await adRegionQueries.getADRegionID(AdRegionID);

        //Validate that record exists
        if (ADRegion.length == 0)
            throw new Error("adregionId record not exists");

        //Get values to update
        const adcountryid = req.body.adcountryid !== undefined ? req.body.adcountryid : ADRegion[0].adcountryid;
        const name = req.body.name !== undefined ? req.body.name : ADRegion[0].name;
        const adUserID = req.body.updatedby;

        const record = adRegionUpdateDTO(
            adcountryid,
            name,
            adUserID,
        );

        if (name != ADRegion[0].name || adcountryid != ADRegion[0].adcountryid) {
            await dbTransaction.beginTransaction();

            //Validate not exists a record with same type and name
            if (name != ADRegion[0].name) {
                const validIDName = await adRegionQueries.getADRegionNameCountryID(adcountryid, name);
                if (validIDName.length >= 1)
                    throw new Error("Exists a record with the same name and countryid");
                await changeLog.createADChangeLog(adUserID, "UPDATE", "adRegion", AdRegionID, "name", ADRegion[0].name, name);
            };

            //validate exists a record with the adcountryid received
            if (adcountryid != ADRegion[0].adcountryid) {
                const valCountryId = await adRegionQueries.getADRegionCountyID(adcountryid);
                if (valCountryId.length == 0)
                    throw new Error("adcountryid record not exist");
                await changeLog.createADChangeLog(adUserID, "UPDATE", "adRegion", AdRegionID, "name", ADRegion[0].adcountryid, adcountryid);
            };

            await adRegionCommands.updateADRegion(record, AdRegionID);
            await dbTransaction.commitTransaction();
        };

        response.success(req, res, AdRegionID, 201, "AdRegion record updated successfully!");

    } catch (error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "ADRegion not updated!", 400, error.message);
    }
};

/**
 * Delete ADRegion
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteADRegion = async (req, res, next) => {
    try {
        const ADRegionID = req.query.adregionid;
        const ADRegion = await adRegionQueries.getADRegionID(ADRegionID);

        //Validate that record exists
        if (ADRegion.length == 0)
            throw new Error("idregion record not exists");

        const adUserID = parseInt(req.query.deletedby);
        if (Number.isNaN(adUserID))
            throw new Error("deletedBy is not valid");

        await dbTransaction.beginTransaction();
        await adRegionCommands.deleteADRegion(ADRegionID);
        await changeLog.createADChangeLog(adUserID, "DELETE", "adRegion", ADRegionID, null, null, null);
        await dbTransaction.commitTransaction();

        response.success(req, res, ADRegionID, 201, "Region record deleted successfully!");

    } catch (error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "Region not deleted!", 400, error.message);
    };
};

