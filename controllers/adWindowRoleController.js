/**
 * Controler used to mange adWindowRole 
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("./adChangeLogController");


const adWindowRoleCommands = require("../infrastucture/commands/adWindowRole/adWindowRoleCommandsModule");

const adWindowRoleQueries = require("../infrastucture/queries/AdWindowRole/adwindowRoleQueriesModule")
const adWindowQueries = require("../infrastucture/queries/AdWindow/adwindowQueriesModule");
const adRoleQueries = require ("../infrastucture/queries/adRole/adRoleQueriesModule")

const adWindowRoleDTO = require("../infrastucture/models/adWindowRole/adWindowRoleDTO");
const adWindowRoleUpdateDTO = require("../infrastucture/models/adWindowRole/aDWindowRoleUpdateDTO");




/**
 * Create adWindowRole 
 */
exports.createADWindowRole = async (req,res,next) => {
    try{
        const record = adWindowRoleDTO(
            req.body.adwindowid,
            req.body.adroleid,
            req.body.isreadwrite,
            req.body.isactive,
            req.body.createdby
        );

        const adUserID = req.body.createdby;
        const adWindowID = req.body.adwindowid
        const adRoleID = req.body.adroleid

        //validate exists a record with the adwindowid received
        const validAdWindowID= await adWindowQueries.getADwindowByID(adWindowID)
        if(validAdWindowID.length === 0)
            throw new Error ("adWindowID record not exist")

        //validate exists a record with the adRoleid received
        const validadRoleID= await adRoleQueries.getADRoleByID(adRoleID)
        if(validadRoleID.length === 0)
            throw new Error ("adRoleID record not exist")

        // validate not exist a record in window role table with the same adroleid and adwindowid received   
        const validWindowRole = await adWindowRoleQueries.getADWindowRoleByWindowIdRoleId(adWindowID,adRoleID)
        if(validWindowRole.length > 0)
            throw new Error ("a record with the adroleid and adwindowid received already exist") 
        
        await dbTransaction.beginTransaction();
        const adWindowRole = await adWindowRoleCommands.createADWindowRole(record);
        const adWindowRoleID = adWindowRole[0].adwindowroleid;
        await changeLog.createADChangeLog(adUserID,"INSERT","adWindowRole",adWindowRoleID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adWindowRoleID, 201, "adWindowRole record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adWindowRole not created!", 400, error.message);
    }
}

/**
 * Update adWindowRole
 */
exports.updateADWindowRole  =  async (req,res,next) => {
    try{
        const adWindowRoleID = req.query.adwindowroleid;
        const adWindowRole = await adWindowRoleQueries.getADWindowRoleByID(adWindowRoleID);

        //Validate that record exists
        if( adWindowRole.length == 0 )
            throw new Error("adWindowRole record not exists");
        
        //Get values to update
        const isreadwrite = req.body.isreadwrite !== undefined ? req.body.isreadwrite : adWindowRole[0].isreadwrite;
        const isactive = req.body.isactive !== undefined ? req.body.isactive : adWindowRole[0].isactive;
        const adUserID = req.body.updatedby;

        const record = adWindowRoleUpdateDTO(
            isreadwrite,
            isactive,
            adUserID,
        );

        if( isreadwrite != adWindowRole[0].isreadwrite || isactive != adWindowRole[0].isactive){
            await dbTransaction.beginTransaction();
            //Validate not exists a record with same name
            

            // Validate change isactive
            if( isactive != adWindowRole[0].isactive ){
                await changeLog.createADChangeLog(adUserID,"UPDATE","adWindowRole",adWindowRoleID,"isactive",adWindowRole[0].isactive,isactive);
            };

             // Validate change isreadwrite
             if( isreadwrite != adWindowRole[0].isreadwrite ){
                await changeLog.createADChangeLog(adUserID,"UPDATE","adWindowRole",adWindowRoleID,"isreadwrite",adWindowRole[0].isreadwrite,isreadwrite);
            };
            
            await adWindowRoleCommands.updateADWindowRole(record,adWindowRoleID);
            await dbTransaction.commitTransaction();
        };

        response.success(req, res, adWindowRoleID, 201, "adWindowRoleID record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adWindowRoleID not updated!", 400, error.message); 
    };
};

/**
 * Delete ADWindowRole
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteADWindowRole = async(req,res,next) => {
    try{
        const adWindowRoleID = req.query.adwindowroleid;
        const adWindowRole  = await adWindowRoleQueries.getADWindowRoleByID(adWindowRoleID);

        //Validate that record exists
        if( adWindowRole.length == 0 )
            throw new Error("adWindowRole record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adWindowRoleCommands.deleteADwindowRole(adWindowRoleID);
        await changeLog.createADChangeLog(adUserID,"DELETE","adWindowRole",adWindowRoleID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adWindowRoleID, 201, "adWindowRoleID record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adWindowRoleID not deleted!", 400, error.message);
    }
}

/**
 * Get ADWindowRole
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADWindowRole = async (req,res,next) => {
    try{
        const AdWindowRoleID = req.query.adwindowroleid != null ? req.query.adwindowroleid : "p.adwindowroleid";
        const adWindowID = req.query.adwindowid != null ? "'" + req.query.adwindowid + "'" : "p.adwindowid";
        const adRoleID = req.query.adroleid != null ? "'" + req.query.adroleid + "'" : "p.adroleid";
        const isReadWrite = req.query.isreadwrite != null ? req.query.isreadwrite : "p.isreadwrite";
        const isactive = req.query.isactive != null ? req.query.isactive : "p.isactive";
       
        const adWindowRole = await adWindowRoleQueries.getADWindowRole(AdWindowRoleID,adWindowID,adRoleID,isReadWrite,isactive);
        response.success(req, res, adWindowRole, 200, adWindowRole.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adWindowRole not exists!", 400, error.message);
    };
};