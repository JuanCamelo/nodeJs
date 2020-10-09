/**
 * Controler used to manage adClient 
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("./adChangeLogController");

const adClientCommands = require("../infrastucture/commands/adClient/adClientCommandsModule");
const adClientQueries = require("../infrastucture/queries/adClient/adClientQueriesModule");
const adClientGroupQueries = require("../infrastucture/queries/adClientGroup/adClientGroupQueriesModule")
const adCountryQueries = require("../infrastucture/queries/adCountry/adCountryQueriesModule")
const adTaxIDTypeQueries = require("../infrastucture/queries/adTaxIDType/adTaxIDTypeQueriesModule")



const adClientDTO = require("../infrastucture/models/adClient/adClientDTO");
const adClientUpdateDTO = require("../infrastucture/models/adClient/adClientUpdateDTO");


/**
 * Create adClient
 */
exports.createADClient = async (req,res,next) => {
    try{
        const record = adClientDTO(
            req.body.adclientgroupid,
            req.body.adcountryid,
            req.body.adtaxidtypeid,
            req.body.name,
            req.body.taxid,
            req.body.isactive,
            req.body.createdby
        );

        const name = req.body.name.toUpperCase();
        const isactive= req.body.isactive;
        const adclientgroupid = req.body.adclientgroupid;
        const adcountryid = req.body.adcountryid;
        const adtaxidtypeid = req.body.adtaxidtypeid;

        //validate exists a record with the adclientgroupid received
        const validAdClientGroupID = await adClientGroupQueries.getADClientGroupByID(adclientgroupid)
        if(validAdClientGroupID.length === 0)
            throw new Error ("adclientgroupID record not exist")
        
        //validate exists a record with the adcountryid received
        const validAdCountryID = await adCountryQueries.getADContryByID(adcountryid)
        if(validAdCountryID.length === 0)
            throw new Error ("adcountryID record not exist") 
        
        //validate exists a record with the taxidtype received
        const validAdTaxIDTypeID = await adTaxIDTypeQueries.getADTaxIDTypeByID(adtaxidtypeid)
        if(validAdTaxIDTypeID.length === 0)
            throw new Error ("adtaxidtypeID record not exist")    

        await dbTransaction.beginTransaction();
        const adClient = await adClientCommands.createADClient(record);
        const adClientID = adClient[0].adclientid;
        await changeLog.createADChangeLog(adClientID,"INSERT","adClient",adClientID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adClientID, 201, "adClient record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adClient not created!", 400, error.message);
    }
}

/**
 * Update adClient
 */

 /* exports.updateADClientGroup  =  async (req,res,next) => {
    try{
        const adCLientGroupID = req.query.adclientgroupid;
        const adClientGroup = await adClientGroupQueries.getADClientGroupByID(adCLientGroupID);

        //Validate that record exists
        if( adClientGroup.length == 0 )
            throw new Error("adClient record not exists");
        
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
            await changeLog.createADChangeLog(adUserID,"UPDATE","adClient",adCLientGroupID,"name",adClientGroup[0].name,name);
        
            if(isactive !== adClientGroup[0].isactive)
            await changeLog.createADChangeLog(adUserID,"UPDATE","adClient",adCLientGroupID,"isactive",adClientGroup[0].isactive,isactive);


            await adClientGroupCommands.updateADClientGroup(record,adCLientGroupID);
            await dbTransaction.commitTransaction();
        }
  
        response.success(req, res, adCLientGroupID, 201, "adClient record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adClient not updated!", 400, error.message); 
    }
}; */

/**
 * Delete adClient
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
            throw new Error("adClient record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adClientGroupCommands.deleteADClientGroup(adClientGroupID);
        await changeLog.createADChangeLog(adUserID,"DELETE","adClient",adClientGroupID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adClientGroupID, 201, "adClient record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adClient not deleted!", 400, error.message);
    }
} 

/**
 * Get adClient
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
        response.error(req, res, "adClient not exists!", 400, error.message);
    }
}