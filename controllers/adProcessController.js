/**
 * Controler used to mange adProcess
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("../controllers/adChangeLogController");

const adProcessCommands = require("../infrastucture/commands/adProcess/adProcessCommandsModule");

const adProcessQueries = require("../infrastucture/queries/adProcess/adProcessQueriesModule");

const adProcessDTO = require("../infrastucture/models/adProcess/adProcessDTO");
const adProcessUpdateDTO = require("../infrastucture/models/adProcess/adProcessUpdateDTO");




/**
 * Create adProcess 
 */
exports.createADProcess = async (req,res,next) => {
    try{
        const record = adProcessDTO(
            req.body.name,
            req.body.description,
            req.body.isactive,
            req.body.createdby
        );

        const name = req.body.name.toUpperCase();
        const adUserID = req.body.createdby;

        //Validate not exists a record with same name
        const valName = await adProcessQueries.getADProcessNameByID(name);
        if(valName.length > 0 )
            throw new Error("Exists a record with same name");
        
        await dbTransaction.beginTransaction();
        const adProcess = await adProcessCommands.createADProcess(record);
        const adProcessID = adProcess[0].adprocesid;
        await changeLog.createADChangeLog(adUserID,"INSERT","adprocess",adProcessID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adProcessID, 201, "adprocess record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adprocess not created!", 400, error.message);
    }
}

/**
 * Update adProcess
 */
exports.updateADProcess  =  async (req,res,next) => {
    try{
        const adProcessID = req.query.adprocesid;
        const adProcess = await adProcessQueries.getADprocessByID(adProcessID);

        //Validate that record exists
        if( adProcess.length == 0 )
            throw new Error("adprocess record not exists");
        
        //Get values to update
        const name = req.body.name !== undefined ? req.body.name : adProcess[0].name;
        const description = req.body.description !== undefined ? req.body.description : adProcess[0].description;
        const isactive = req.body.isactive !== undefined ? req.body.isactive : adProcess[0].isactive;
        const adUserID = req.body.updatedby;

        const record = adProcessUpdateDTO(
            name,
            description,
            isactive,
            adUserID,
        );

        if( name != adProcess[0].name || description != adProcess[0].description  || isactive !=adProcess[0].isactive){
            await dbTransaction.beginTransaction();
            //Validate not exists a record with same name
            
            if( name != adProcess[0].name ){
                const valName = await adProcessQueries.getADProcessNameByID(name.toUpperCase());
                if(valName.length > 0 )
                    throw new Error("Exists a record with same name");

                await changeLog.createADChangeLog(adUserID,"UPDATE","adprocess",adProcessID,"name",adProcess[0].name,name);
            };

            // Validate description
            if( description != adProcess[0].description ){
                await changeLog.createADChangeLog(adUserID,"UPDATE","adprocess",adProcessID,"description",adProcess[0].description,description);
            };

             // Validate isactive
            if( isactive != adProcess[0].isactive ){
                await changeLog.createADChangeLog(adUserID,"UPDATE","adprocess",adProcessID,"isactive",adProcess[0].isactive,isactive);
            };
            
            await adProcessCommands.updateADProcess(record,adProcessID);
            await dbTransaction.commitTransaction();
        };

        response.success(req, res, adProcessID, 201, "adprocess record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adprocess not updated!", 400, error.message); 
    };
};

/**
 * Delete adProcess
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteADProcess = async(req,res,next) => {
    try{
        const adProcessID = req.query.adprocesid;
        const adProcess  = await adProcessQueries.getADprocessByID(adProcessID);

        //Validate that record exists
        if( adProcess.length == 0 )
            throw new Error("adprocesid record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedby is not valid");
        
        await dbTransaction.beginTransaction();
        await adProcessCommands.deleteADProcess(adProcessID);
        await changeLog.createADChangeLog(adUserID,"DELETE","adprocess",adProcessID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adProcessID, 201, "adprocess record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adprocess not deleted!", 400, error.message);
    }
}

/**
 * Get adProcess
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADProcess = async (req,res,next) => {
    try{
        const adprocesid = req.query.adprocesid != null ? req.query.adprocesid : "p.adprocesid";
        const name = req.query.name != null ? "'" + req.query.name + "'" : "p.name";
        const description = req.query.description != null ? "'" + req.query.description + "'" : "p.description";
        const isactive = req.query.isactive != null ? req.query.isactive : "p.isactive";
       
        const adProcess = await adProcessQueries.getADProcess(adprocesid,name, description,isactive);
        response.success(req, res, adProcess, 200, adProcess.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adprocess not exists!", 400, error.message);
    };
};