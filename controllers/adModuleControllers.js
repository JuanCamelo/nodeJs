/**
 * Controler used to mange adModule 
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("../controllers/adChangeLogController");

const adModuleCommands = require("../infrastucture/commands/adModule/adModuleCommandsModule");

const adModuleQueries = require("../infrastucture/queries/adModule/adModuleQueriesModule");

const adModuleDTO = require("../infrastucture/models/adModule/adModuleDTO");
const adMuduleUpdateDTO = require("../infrastucture/models/adModule/adModuleUpdateDTO");


/**
 * Create adModule
 */
exports.createADModule = async (req,res,next) => {
    try{
        const record = adModuleDTO(
            req.body.name,
            req.body.createdby
        );

        const name = req.body.name.toUpperCase();
        const adUserID = req.body.createdby;

        //Validate not exists a record with same name
        const valName = await adModuleQueries.getADModuleNameByID(name);
        if(valName.length > 0 )
            throw new Error("Exists a record with same name");
        
        await dbTransaction.beginTransaction();
        const adModule = await adModuleCommands.createModule(record);
        const adModuleID = adModule[0].admoduleid;
        await changeLog.createADChangeLog(adUserID,"INSERT","adModule",adModuleID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adModuleID, 201, "adModule record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adModule not created!", 400, error.message);
    }
}

/**
 * Update adModule
 */
exports.updateADModule  =  async (req,res,next) => {
    try{
        const adModuleID = req.query.admoduleid;
        const adModule = await adModuleQueries.getADModuleByID(adModuleID);

        //Validate that record exists
        if( adModule.length == 0 )
            throw new Error("adModule record not exists");
        
        //Get values to update
        const name = req.body.name !== undefined ? req.body.name : adModule[0].name;
        const adUserID = req.body.updatedby;

        const record = adMuduleUpdateDTO(
            name,
            adUserID,
        );

        if( name != adModule[0].name ){
            await dbTransaction.beginTransaction();
            //Validate not exists a record with same name
            
            if( name != adModule[0].name ){
                const valName = await adModuleQueries.getADModuleNameByID(name.toUpperCase());
                if(valName.length > 0 )
                    throw new Error("Exists a record with same name");

                await changeLog.createADChangeLog(adUserID,"UPDATE","adModule",adModuleID,"name",adModule[0].name,name);
            }
            
            await adModuleCommands.updateModule(record,adModuleID);
            await dbTransaction.commitTransaction();
        }

        response.success(req, res, adModuleID, 201, "adModule record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adMudule not updated!", 400, error.message); 
    }
};

/**
 * Delete ADModule
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteADModule = async(req,res,next) => {
    try{
        const adModuleID = req.query.admoduleid;
        const adModule = await adModuleQueries.getADModuleByID(adModuleID);

        //Validate that record exists
        if( adModule.length == 0 )
            throw new Error("admoduleid record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adModuleCommands.deleteModule(adModuleID);
        await changeLog.createADChangeLog(adUserID,"DELETE","adModule",adModuleID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adModuleID, 201, "adModule record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adModule not deleted!", 400, error.message);
    }
}

/**
 * Get ADModule
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADModule = async (req,res,next) => {
    try{
        const admoduleid = req.query.admoduleid != null ? req.query.admoduleid : "p.admoduleid";
        const name = req.query.name != null ? "'" + req.query.name + "'" : "p.name";
       
        const adModule = await adModuleQueries.getAdModule(admoduleid,name);
        response.success(req, res, adModule, 200, adModule.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adModule not exists!", 400, error.message);
    }
}