/**
 * Controler used to mange adProcessRole
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("../controllers/adChangeLogController");

const adProcessRoleCommands = require("../infrastucture/commands/adProcessRole/adProcessRoleCommandsModule");

const adProcessRoleQueries = require("../infrastucture/queries/adProcessRole/adProcessRoleQueriesModule");
const adProcessQueries = require("../infrastucture/queries/adProcess/adProcessQueriesModule");
const adRoleQueries = require("../infrastucture/queries/adRole/adRoleQueriesModule")

const adProcessRoleDTO = require("../infrastucture/models/adProcessRole/adProcessRoleDTO");
const adProcessRoleUpdateDTO = require("../infrastucture/models/adProcessRole/adProcessRoleUpdateDTO");




/**
 * Create adProcessRole 
 */
exports.createADProcessRole = async (req,res,next) => {
    try{
        const record = adProcessRoleDTO(
            req.body.adprocessid,
            req.body.adroleid,
            req.body.isactive,
            req.body.createdby
        );

        const adprocessID = req.body.adprocessid;
        const adroleID = req.body.adroleid;
        const adUserID = req.body.createdby;

        //Validate exists a record same adprocessid
        const valIDprocess = await adProcessQueries.getADprocessByID(adprocessID);
        if(valIDprocess.length == 0 )
            throw new Error("adprocessid record not exists");

        //Validate exists a record same adroleid
        const valIDRole = await adRoleQueries.getADRoleByID(adroleID);
        if(valIDRole.length == 0 )
                throw new Error("adroleid record not exists");
        

        //Validate not exists a record same adprocessid-adroleid
        const valProcessRole = await adProcessRoleQueries.getADProcessRoleByProcessRole(adprocessID,adroleID);
        if(valProcessRole.length > 0 )
                throw new Error("Exists a processrole with the relation adprocessid-adroleid");


        await dbTransaction.beginTransaction();
        const adProcessRole = await adProcessRoleCommands.createADProcessRole(record);
        const adProcessRoleID = adProcessRole[0].adprocessroleid;
        await changeLog.createADChangeLog(adUserID,"INSERT","adprocessrole",adProcessRoleID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adProcessRoleID, 201, "adprocessRole record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adprocessRole not created!", 400, error.message);
    }
}

/**
 * Update adProcessRole
 */
exports.updateADProcessRole  =  async (req,res,next) => {
    try{
        const adProcessRoleID = req.query.adprocessroleid;
        const adProcessRole = await adProcessRoleQueries.getADProcessRoleByID(adProcessRoleID);

        //Validate that record exists
        if( adProcessRole.length == 0 )
            throw new Error("adprocessroleid record not exists");
        
        //Get values to update
        const isactive = req.body.isactive !== undefined ? req.body.isactive : adProcessRole[0].isactive;
        const adUserID = req.body.updatedby;

        const record = adProcessRoleUpdateDTO(            
            isactive,
            adUserID,
        );

        if( isactive !=adProcessRole[0].isactive){
            await dbTransaction.beginTransaction();
           
             // Validate isactive
            if( isactive != adProcessRole[0].isactive ){
                await changeLog.createADChangeLog(adUserID,"UPDATE","adprocessrole",adProcessRoleID,"isactive",adProcessRole[0].isactive,isactive);
            };
            
            await adProcessRoleCommands.updateADProcessRole(record,adProcessRoleID);
            await dbTransaction.commitTransaction();
        };

        response.success(req, res, adProcessRoleID, 201, "adprocessrole record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adprocessrole not updated!", 400, error.message); 
    };
};

/**
 * Delete adProcess
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteADProcessRole = async(req,res,next) => {
    try{
        const adProcessRoleID = req.query.adprocessroleid;
        const adProcessRole  = await adProcessRoleQueries.getADProcessRoleByID(adProcessRoleID);

        //Validate that record exists
        if( adProcessRole.length == 0 )
            throw new Error("adprocessroleid record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedby is not valid");
        
        await dbTransaction.beginTransaction();
        await adProcessRoleCommands.deleteADProcessRole(adProcessRoleID);
        await changeLog.createADChangeLog(adUserID,"DELETE","adprocessrole",adProcessRoleID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adProcessRoleID, 201, "adprocessrole record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adprocessrole not deleted!", 400, error.message);
    }
}

/**
 * Get adProcess
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADProcessRole = async (req,res,next) => {
    try{
        const adprocessroleid = req.query.adprocessroleid != null ? req.query.adprocessroleid : "p.adprocessroleid";
        const adprocessid = req.query.adprocessid != null ? "'" + req.query.adprocessid + "'" : "p.adprocessid";
        const adroleid = req.query.adroleid != null ? "'" + req.query.adroleid + "'" : "p.adroleid";
        const isactive = req.query.isactive != null ? req.query.isactive : "p.isactive";
       
        const adProcessRole = await adProcessRoleQueries.getADProcessRole(adprocessroleid,adprocessid,adroleid,isactive);
        response.success(req, res, adProcessRole, 200, adProcessRole.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adprocessRole not exists!", 400, error.message);
    };
};