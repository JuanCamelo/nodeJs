/**
 * Controler used to manage adClientGroup 
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("./adChangeLogController");

const adClientGroupCommands = require("../infrastucture/commands/adClientGroup/adClientGroupCommandsModule");
const adClientGroupQueries = require("../infrastucture/queries/adClientGroup/adClientGroupQueriesModule");

const adClientGroupDTO = require("../infrastucture/models/adClientGroup/adClientGroupDTO");
const adClientGroupUpdateDTO = require("../infrastucture/models/adClientGroup/adClientGroupUpdateDTO");


/**
 * Create adClientGroup
 */
exports.createADClientGroup = async (req,res,next) => {
    try{
        const record = adClientGroupDTO(
            req.body.name,
            req.body.isactive,
            req.body.createdby
        );

        const name = req.body.name.toUpperCase();
        const isactive= req.body.isactive;

       /*  //Validate not exists a record with same name
        const valName = await adClientGroupQueries.getADClientGroupByName(name);
        if(valName.length > 0 )
            throw new Error("Exists a record with the same name"); */ //preguntar si aplica esta validación para esta tabla
        
        await dbTransaction.beginTransaction();
        const adClientGroup = await adClientGroupCommands.createADClientGroup(record);
        const adClientGroupID = adClientGroup[0].adclientgroupid;
        await changeLog.createADChangeLog(adClientGroupID,"INSERT","adClientGroup",adClientGroupID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adClientGroupID, 201, "adClientGroup record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adClientGroup not created!", 400, error.message);
    }
}

/**
 * Update adClientGroup
 */

 exports.updateADClientGroup  =  async (req,res,next) => {
    try{
        const adCLientGroupID = req.query.adclientgroupid;
        const adClientGroup = await adClientGroupQueries.getADClientGroupByID(adCLientGroupID);

        //Validate that record exists
        if( adClientGroup.length == 0 )
            throw new Error("adClientGroup record not exists");
        
        //Get values to update
        const name = req.body.name !== undefined ? req.body.name : adClientGroup[0].name;
        const isactive = req.body.isactive !== undefined ? req.body.isactive : adClientGroup[0].isactive;
        const adUserID = req.body.updatedby;

        const record = adClientGroupUpdateDTO(
            name,
            isactive,
            adUserID,
        );

        if( name !== adClientGroup[0].name || isactive !== adClientGroup[0].isactive){
            await dbTransaction.beginTransaction();

            if(name !== adClientGroup[0].name)
            await changeLog.createADChangeLog(adUserID,"UPDATE","adClientGroup",adCLientGroupID,"name",adClientGroup[0].name,name);
        
            if(isactive !== adClientGroup[0].isactive)
            await changeLog.createADChangeLog(adUserID,"UPDATE","adClientGroup",adCLientGroupID,"isactive",adClientGroup[0].isactive,isactive);


            await adClientGroupCommands.updateADClientGroup(record,adCLientGroupID);
            await dbTransaction.commitTransaction();
        }
  
        response.success(req, res, adCLientGroupID, 201, "adClientGroup record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adClientGroup not updated!", 400, error.message); 
    }
};

/**
 * Delete adClientGroup
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.deleteADClientGroup = async(req,res,next) => {
    try{
        const adClientGroupID = req.query.adclientgroupid;
        const adClientGroup = await adClientGroupQueries.getADClientGroupByID(adClientGroupID);

        //Validate that record exists
        if( adClientGroup.length == 0 )
            throw new Error("adClientGroup record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adClientGroupCommands.deleteADClientGroup(adClientGroupID);
        await changeLog.createADChangeLog(adUserID,"DELETE","adClientGroup",adClientGroupID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adClientGroupID, 201, "adClientGroup record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adMenu not deleted!", 400, error.message);
    }
} 

/**
 * Get adClientGroup
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADClientGroup = async (req,res,next) => {
    try{
        const adclientgroupid = req.query.adclientgroupid != null ? req.query.adclientgroupid : "p.adclientgroupid";
        const name = req.query.name != null ? "'" + req.query.name + "'" : "p.name";
        const isactive = req.query.isactive != null ? req.query.isactive : "p.isactive";

        const adClientGroup = await adClientGroupQueries.getADClientGroup(adclientgroupid,name,isactive);
        response.success(req, res, adClientGroup, 200, adClientGroup.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adClientGroup not exists!", 400, error.message);
    }
}