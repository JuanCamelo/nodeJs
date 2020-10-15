/**
 * Controler used to mange adClientModule 
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("../controllers/adChangeLogController");

const adClientModuleCommands = require("../infrastucture/commands/adClientModule/adClientModuleCommandsModule");

const adClientModuleQueries = require("../infrastucture/queries/adClientModule/adClientModuleQueriesModule");
const adModuleQueries = require("../infrastucture/queries/adModule/adModuleQueriesModule");

const adClientModuleDTO = require("../infrastucture/models/adClientModule/adClientModuleDTO");
const adClientMuduleUpdateDTO = require("../infrastucture/models/adClientModule/adClientModuleUpdateDTO");
const adClientModuleCommandsModule = require("../infrastucture/commands/adClientModule/adClientModuleCommandsModule");


/**
 * Create adModule
 */
exports.createADClientModule = async (req,res,next) => {
    try{
        const record = adClientModuleDTO(
            req.body.admoduleid,
            req.body.adclientid,
            req.body.isactive,
            req.body.createdby
            
        );
        const IDModule = req.body.admoduleid;
        const IDClient = req.body.adclientid;
        const adUserID = req.body.createdby;

        //Validate exists a record with same admoduleid
        const valModuleID = await adModuleQueries.getADModuleByID(IDModule);
        
        if(valModuleID.length == 0 )
            throw new Error("admoduleid record not exists");

         //Validate exists a record with same adclientid
         const valClientID = await adClientModuleQueries.getADClientByID(IDClient);
         if(valClientID.length == 0 )
             throw new Error("adclientid record not exists");
        
        //Validate exists a ClientModule with the relation admodule-adclient
        const valModuleClientID = await adClientModuleQueries.getModuleClietID(IDModule, IDClient);
        if (valModuleClientID.length >=1) 
            throw new Error("Exists a ClientModule with the relation admodule-adclient");
        
        
        await dbTransaction.beginTransaction();
        const adClientModule = await adClientModuleCommands.createADClientModule(record);
        const adClientModuleID = adClientModule[0].adclientmoduleid;
        await changeLog.createADChangeLog(adUserID,"INSERT","adClientModule",adClientModuleID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adClientModuleID, 201, "adModule record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adModule not created!", 400, error.message);
    }
};

/**
 * Update adClientModule
 */
exports.updateADClientModule  =  async (req,res,next) => {
    try{
        const adClientModuleID = req.query.adclientmoduleid;
        const adClientModule = await adClientModuleQueries.getADClientModuleByID(adClientModuleID);

        //Validate that record exists
        if(adClientModule.length == 0 )
            throw new Error("adClientModule record not exists");
        
        //Get values to update
        const isactive = req.body.isactive !== undefined ? req.body.isactive : adClientModule[0].isactive;
        const adUserID = req.body.updatedby;
        
        const record = adClientMuduleUpdateDTO(
            isactive,
            adUserID,
        );

        if(isactive !== adClientModule[0].isactive ){
            await dbTransaction.beginTransaction();            
            await changeLog.createADChangeLog(adUserID,"UPDATE","adClientModule",adClientModuleID,"isactive",adClientModule[0].isactive,isactive);             
            await adClientModuleCommandsModule.upadateADClientModule(record,adClientModuleID);
            await dbTransaction.commitTransaction();
        }

        response.success(req, res, adClientModuleID, 201, "adClientModule record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adClientMudule not updated!", 400, error.message); 
    }
};

/**
 * Delete ADClientModule
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteADClientModule = async(req,res,next) => {
    try{
        const adClientModuleID = req.query.adclientmoduleid;
        const adClientModule = await adClientModuleQueries.getADClientModuleByID(adClientModuleID);

        //Validate that record exists
        if( adClientModule.length == 0 )
            throw new Error("adClientModule record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adClientModuleCommandsModule.deleteADClientModule(adClientModuleID);
        await changeLog.createADChangeLog(adUserID,"DELETE","adClientModule",adClientModuleID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adClientModuleID, 201, "adClientModule record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adClientModule not deleted!", 400, error.message);
    }
};

/**
 * Get ADClientModule
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADClientModule = async (req,res,next) => {
    try{
        const adclientmoduleid = req.query.adclientmoduleid != null ? req.query.adclientmoduleid : "p.adclientmoduleid";
        const admoduleid = req.query.admoduleid != null ?  req.query.admoduleid  : "p.admoduleid";
        const adclientid = req.query.adclientid != null ?  req.query.adclientid  : "p.adclientid";
        const isactive = req.query.isactive != null ?  req.query.isactive : "p.isactive";
       
        const adClientModule = await adClientModuleQueries.getADClientModule(adclientmoduleid,admoduleid,adclientid,isactive);
        response.success(req, res, adClientModule, 200, adClientModule.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adClientModule not exists!", 400, error.message);
    }
};