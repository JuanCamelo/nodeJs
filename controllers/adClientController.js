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

  exports.updateADClient  =  async (req,res,next) => {
    try{
        const adCLientID = req.query.adclientid;
        const adClient = await adClientQueries.getADClientByID(adCLientID);

        //Validate that record exists
        if( adClient.length == 0 )
            throw new Error("adClient record not exists"); 
        
        
        
        //Get values to update
      
        const adcountryID = req.body.adcountryid != undefined ? req.body.adcountryid : adClient[0].adcountryid;
        const adTaxIDTypeID = req.body.adtaxidtypeid != undefined ? req.body.adtaxidtypeid : adClient[0].adtaxidtypeid;
        const name = req.body.name !== undefined ? req.body.name : adClient[0].name;
        const taxID = req.body.taxid !== undefined ? req.body.taxid : adClient[0].taxid;
        const isactive = req.body.isactive !== undefined ? req.body.isactive : adClient[0].isactive;
        const adUserID = req.body.updatedby;

        //validate exists a record with the adcountryid received
        const validAdCountryID = await adCountryQueries.getADContryByID(adcountryID)
        if(validAdCountryID.length === 0)
            throw new Error ("adcountryID record not exist") 
        
        //validate exists a record with the taxidtype received
        const validAdTaxIDTypeID = await adTaxIDTypeQueries.getADTaxIDTypeByID(adTaxIDTypeID)
        if(validAdTaxIDTypeID.length === 0)
            throw new Error ("adtaxidtypeID record not exist") 

        const record = adClientUpdateDTO(
            adcountryID,
            adTaxIDTypeID,
            name,
            taxID,
            isactive,
            adUserID,
        );

        if(  adcountryID !== adClient[0].adcountryid || adTaxIDTypeID !== adClient[0].adtaxidtypeid ||  name !== adClient[0].name || taxID !== adClient[0].taxid || isactive !== adClient[0].isactive){

            await dbTransaction.beginTransaction();

            if(adcountryID !== adClient[0].adcountryid)
            await changeLog.createADChangeLog(adUserID,"UPDATE","adClient",adCLientID,"adCountryID",adClient[0].adcountryid,adcountryID);

            if(adTaxIDTypeID !== adClient[0].adtaxidtypeid)
            await changeLog.createADChangeLog(adUserID,"UPDATE","adClient",adCLientID,"adTaxIDTypeID",adClient[0].adtaxidtypeid,adTaxIDTypeID);

            if(name !== adClient[0].name)
            await changeLog.createADChangeLog(adUserID,"UPDATE","adClient",adCLientID,"name",adClient[0].name,name);

            if(taxID != adClient[0].taxid)
            await changeLog.createADChangeLog(adUserID,"UPDATE","adClient",adCLientID,"taxID",adClient[0].taxid,taxID);
        
            if(isactive !== adClient[0].isactive)
            await changeLog.createADChangeLog(adUserID,"UPDATE","adClient",adCLientID,"isactive",adClient[0].isactive,isactive);


            await adClientCommands.updateADClient(record,adCLientID);
            await dbTransaction.commitTransaction();
        }
  
        response.success(req, res, adCLientID, 201, "adClient record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adClient not updated!", 400, error.message); 
    }
}; 

/**
 * Delete adClient
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.deleteADClient = async(req,res,next) => {
    try{
        const adClientID = req.query.adclientgroupid;
        const adClient = await adClientQueries.getADClientByID(adClientID);

        //Validate that record exists
        if( adClient.length == 0 )
            throw new Error("adClient record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adClientCommands.deleteADClient(adClientID);
        await changeLog.createADChangeLog(adUserID,"DELETE","adClient",adClientID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adClientID, 201, "adClient record deleted successfully!");

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
exports.getADClient = async (req,res,next) => {
    try{
        const adclientid = req.query.adclientid != null ? req.query.adclientid : "p.adclientid";
        const adclientgroupid = req.query.adclientgroupid != null ? req.query.adclientgroupid : "p.adclientgroupid";
        const adcountryid = req.query.adcountryid != null ? req.query.adcountryid : "p.adcountryid";
        const adtaxidtypeid = req.query.adtaxidtypeid != null ? req.query.adtaxidtypeid : "p.adtaxidtypeid";
        const name = req.query.name != null ? "'" + req.query.name + "'" : "p.name";
        const taxid = req.query.taxid != null ? "'" + req.query.taxid + "'" : "p.taxid";
        const isactive = req.query.isactive != null ? req.query.isactive : "p.isactive";

        const adClient = await adClientQueries.getADClient(adclientid,adclientgroupid,adcountryid,adtaxidtypeid,name,taxid,isactive);
        response.success(req, res, adClient, 200, adClient.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adClient not exists!", 400, error.message);
    }
}