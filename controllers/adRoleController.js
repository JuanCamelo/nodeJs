/**
 * Controler used to manage adRole
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("./adChangeLogController");

const adRoleCommands = require("../infrastucture/commands/adRole/adRoleCommandsModule");

const adClientQueries = require("../infrastucture/queries/adClient/adClientQueriesModule");
const adRoleQueries = require("../infrastucture/queries/adRole/adRoleQueriesModule");

const AdRoleDTO = require("../infrastucture/models/adRole/adRoleDTO");
const adRoleUpdateDTO = require("../infrastucture/models/adRole/adRoleUpdateDTO");


/**
 * Create adRole
 */
exports.createADRole = async (req,res,next) => {
    try{
        const record = AdRoleDTO(
            req.body.adclientid,
            req.body.name,
            req.body.isactive,
            req.body.createdby
        );

        const name = req.body.name.toLowerCase();
        const adClientID=req.body.adclientid

        //validate exists a record with the adclientid received
        const validClientID= await adClientQueries.getADClientByID(adClientID)
        if(validClientID.length === 0)
            throw new Error ("adclient record not exist")
        
        //Validate not exists a record with same name and adClient
        const validIDName = await adRoleQueries.getADRoleByIDClientName(adClientID,name);
        if(validIDName.length >= 1 )
            throw new Error("Exists a record with the same name and adClientID");
        
        await dbTransaction.beginTransaction();
        const adRole = await adRoleCommands.createADRole(record);
        const adRoleID = adRole[0].adroleid;
        await changeLog.createADChangeLog(adRoleID,"INSERT","adRole",adRoleID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adRoleID, 201, "adRoleID record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adRoleID not created!", 400, error.message);
    }
}

/**
 * Update adRole
 */

 exports.updateADRole  =  async (req,res,next) => {
    try{
        const adRoleID = req.query.adroleid;
        const adRole = await adRoleQueries.getADRoleByID(adRoleID);

        //Validate that record exists
        if( adRole.length == 0 )
            throw new Error("adRole record not exists");

            //Get values to update
        const name = req.body.name !== undefined ? req.body.name.toLowerCase() : adRole[0].name;
        const isactive = req.body.isactive !== undefined ? req.body.isactive : adRole[0].isactive;
        const adUserID = req.body.updatedby;


        const record = adRoleUpdateDTO(
            name,
            isactive,
            adUserID,
        );

        if( name != adRole[0].name || isactive != adRole[0].isactive){
            await dbTransaction.beginTransaction();
        //Validate not exists a record with same name and adClientid
            const validIDName = await adRoleQueries.getADRoleByIDName(adRole[0].adclientid,name,adRoleID);
            if(validIDName.length >= 1 )
            throw new Error("Exists a record with the same name and adClientID");

            if(name != adRole[0].name)
                await changeLog.createADChangeLog(adUserID,"UPDATE","adRole",adRoleID,"name",adRole[0].name,name);
            
            if(isactive != adRole[0].isactive)    
                 await changeLog.createADChangeLog(adUserID,"UPDATE","adRole",adRoleID,"isactive",adRole[0].isactive,isactive);

            await adRoleCommands.updateADRole(record,adRoleID);
            await dbTransaction.commitTransaction();
        }
  
        response.success(req, res, adRoleID, 201, "adRole record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adRole not updated!", 400, error.message); 
    }
};  

/**
 * Delete ADRole
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.deleteADRole = async(req,res,next) => {
    try{
        const adRoleID = req.query.adroleid;
        const adRole = await adRoleQueries.getADRoleByID(adRoleID);

        //Validate that record exists
        if( adRole.length == 0 )
            throw new Error("adRole record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adRoleCommands.deleteADRole(adRoleID);
        await changeLog.createADChangeLog(adUserID,"DELETE","adRole",adRoleID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adRoleID, 201, "adRoleID record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adRoleID not deleted!", 400, error.message);
    }
} 

/**
 * Get ADRole
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADRole = async (req,res,next) => {
    try{
        const adRoleID = req.query.adroleid != null ? req.query.adroleid : "p.adroleid";
        const adClientID = req.query.adclientid != null ? req.query.adclientid : "p.adclientid";
        const name = req.query.name != null ? "'" + req.query.name + "'" : "p.name";
        const isactive = req.query.isactive != null ? "'" + req.query.isactive + "'" : "p.isactive";


        const adRole = await adRoleQueries.getADRole(adRoleID,adClientID,name,isactive);
        response.success(req, res, adRole, 200, adRole.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adRole not exists!", 400, error.message);
    }
} 