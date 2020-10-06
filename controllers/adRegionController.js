/**
 * Controler used to mange adRegion 
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("../controllers/adChangeLogController");

const adRegionCommands = require("../infrastucture/commands/adRegion/adRegionCommandsModule");

const adRegionQueries = require("../infrastucture/queries/adregion/getRegionQueriesModule");

const adRegionDTO = require("../infrastucture/models/ADRegion/adRegionDTO");
const adRegionUpdateDTO = require("../infrastucture/models/adRegion/adRegionUpdateDTO");


/**
 * Create adregion
 */
exports.createADRegion = async (req,res,next) => {
    try{
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
        if(valCountryId.length == 0 )
            throw new Error("adcountryid record not exist");
        
        //Validate not exists a record with same name and adcountryid
        const validIDName = await adRegionQueries.getADRegionNameCountryID(adCountyID,name);
        if(validIDName.length >= 1 )
            throw new Error("Exists a record with the same name and adcountryid");
        
        await dbTransaction.beginTransaction();
        const ADRegion = await adRegionCommands.createADRegion(record);
        const AdRegionID = ADRegion[0].adregionid;
        await changeLog.createADChangeLog(adUserID,"INSERT","AdRegion",AdRegionID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, AdRegionID, 201, "AdRegion record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "AdRegion not created!", 400, error.message);
    }
}

/**
 * Update ADRegion
 */
exports.updateADRegion  =  async (req,res,next) => {
    try{
        const AdRegionID = req.query.adregionid;
        const ADRegion = await adRegionQueries.getADRegionID(AdRegionID);

        //Validate that record exists
        if( ADRegion.length == 0 )
            throw new Error("ADRegion record not exists");
        
        //Get values to update
        const type = ADRegion[0].type;
        const name = req.body.name !== undefined ? req.body.name : ADRegion[0].name;
        const value = req.body.value !== undefined ? req.body.value : ADRegion[0].value;
        const list = ADRegion[0].list;
        const adUserID = req.body.updatedby;

        const record = adRegionUpdateDTO(
            type,
            name,
            value,
            list,
            adUserID,
        );

        if( name != ADRegion[0].name || value != ADRegion[0].value ){
            await dbTransaction.beginTransaction();
            //Validate not exists a record with same type and name
            
            if( name != ADRegion[0].name ){
                const valTypeName = await adRegionQueries.getADRegionByTypeName(type.toUpperCase(),name.toUpperCase());
                if(valTypeName.length > 0 )
                    throw new Error("Exists a parameter with the relation type-name");

                await changeLog.createADChangeLog(adUserID,"UPDATE","ADRegion",ADRegionID,"name",ADRegion[0].name,name);
            }
            if( value != ADRegion[0].value ){
                //Validate not exists a record with same type and value if list is true
                if( list == true ){
                    const valTypeValue = await adRegionQueries.getADRegionByTypeValue(type.toUpperCase(),value.toUpperCase());
                    if(valTypeValue.length > 0 )
                        throw new Error("Exists a parameter with the relation type-vale");
                }
                await changeLog.createADChangeLog(adUserID,"UPDATE","ADRegion",ADRegionID,"value",ADRegion[0].value,value);
            }

            await adRegionCommands.updateADRegion(record,ADRegionID);
            await dbTransaction.commitTransaction();
        }

        response.success(req, res, ADRegionID, 201, "AdRegion record updated successfully!");

    } catch(error) {
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
exports.deleteADRegion = async(req,res,next) => {
    try{
        const ADRegionID = req.query.ADRegionid;
        const ADRegion = await adRegionQueries.getADRegionByID(ADRegionID);

        //Validate that record exists
        if( ADRegion.length == 0 )
            throw new Error("ADRegion record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adRegionCommands.deleteADRegion(ADRegionID);
        await changeLog.createADChangeLog(adUserID,"DELETE","ADRegion",ADRegionID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, ADRegionID, 201, "ADRegion record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "ADRegion not created!", 400, error.message);
    }
}

/**
 * Get ADRegion
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADRegion = async (req,res,next) => {
    try{
        const ADRegionid = req.query.ADRegionid != null ? req.query.ADRegionid : "p.ADRegionid";
        const type = req.query.type != null ? "'" + req.query.type + "'" : "p.type";
        const name = req.query.name != null ? "'" + req.query.name + "'" : "p.name";
        const value = req.query.value != null ? "'" + req.query.value + "'" : "p.value";
        const list = req.query.list != null ? req.query.list : "p.list";

        const ADRegions = await adRegionQueries.getADRegion(ADRegionid,type,name,value,list);
        response.success(req, res, ADRegions, 200, ADRegions.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "ADRegion not exists!", 400, error.message);
    }
}