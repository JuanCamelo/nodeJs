/**
 * Controller used to manage adTaxIDType
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("./adChangeLogController");

const adTaxIDTypeCommands = require("../infrastucture/commands/adTaxIDType/adTaxIDTypeCommandsModule");

const adCountryQueries = require("../infrastucture/queries/adCountry/adCountryQueriesModule");
const adTaxIDTypeQueries = require("../infrastucture/queries/adTaxIDType/adTaxIDTypeQueriesModule");

const AdTaxIDTypeDTO = require("../infrastucture/models/adTaxIDType/adTaxIDTypeDTO");
const AdTaxIDTypeDTOUpdateDTO = require("../infrastucture/models/adTaxIDType/adTaxIDTypeUpdateDTO");


/**
 * Create adTaxIDType
 */
exports.createADTaxIDType = async (req,res,next) => {
    try{
        const record = AdTaxIDTypeDTO(
            req.body.adcountryid,
            req.body.code,
            req.body.name,
            req.body.createdby
        );

        const name = req.body.name.toUpperCase();
        const adCountryID = req.body.adcountryid;
        const code = req.body.code.toUpperCase();

        //validate exists a record with the adCountryID received
        const validCountryID= await adCountryQueries.getADContryByID(adCountryID)
        if(validCountryID.length === 0)
            throw new Error ("adcountryid record not exist")
        
        //Validate not exists a record with same name and adCountryid
        const validIDName = await adTaxIDTypeQueries.getADTaxIDTypeByIDName(adCountryID,name);
        if(validIDName.length >= 1 )
            throw new Error("Exists a record with the same name and adCountryID");

        //Validate no exist a record with same code and adCountryid
        const validIDCode = await adTaxIDTypeQueries.getADTaxIDTypeByIDCode(adCountryID,code);
        if(validIDCode.length >= 1 )
            throw new Error("Exists a record with the same code and adCountryID");    
        
        await dbTransaction.beginTransaction();
        const adTaxIDType = await adTaxIDTypeCommands.createADTaxIDType(record);
        const adTaxIDOption = adTaxIDType[0].adtaxidtype;
        await changeLog.createADChangeLog(adTaxIDOption,"INSERT","adTaxIDType",adTaxIDOption,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adTaxIDOption, 201, "adTaxIDType record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adTaxIDType not created!", 400, error.message);
    }
}

/**
 * Update adTaxIDType
 */

 exports.updateADTaxIDType  =  async (req,res,next) => {
    try{
        const adTaxIDTypeid = req.query.adtaxidtypeid;
        const adTaxIDType = await adTaxIDTypeQueries.getADTaxIDTypeByID(adTaxIDTypeid);

        //Validate that record exists
        if( adTaxIDType.length == 0 )
            throw new Error("adTaxIDType record not exists");

            //Get values to update
        const code = req.body.code !== undefined ? req.body.code.toUpperCase() : adTaxIDType[0].code   
        const name = req.body.name !== undefined ? req.body.name.toUpperCase() : adTaxIDType[0].name;
        const adUserID = req.body.updatedby;


        const record = AdTaxIDTypeDTOUpdateDTO(
            code,
            name,
            adUserID,
        );

        if( name != adTaxIDType[0].name || code!=adTaxIDType[0].code){
            await dbTransaction.beginTransaction();
        //Validate not exists a record with same name and adCountryID
            const validIDName = await adTaxIDTypeQueries.getADTaxIDTypeByIDName(adTaxIDType[0].adcountryid,name,adTaxIDType[0].adtaxidtype);
            if(validIDName.length >= 1 )
            throw new Error("Exists a record with the same name and adCountryID");
         
        //Validate not exists a record with same code and adCountryid
        const validIDCode = await adTaxIDTypeQueries.getADTaxIDTypeByIDCode(adTaxIDType[0].adcountryid,code,adTaxIDType[0].adtaxidtype);
        if(validIDCode.length >= 1 )
        throw new Error("Exists a record with the same code and adCountryID");

            await changeLog.createADChangeLog(adUserID,"UPDATE","adTaxIDType",adTaxIDTypeid,"name",adTaxIDType[0].name,name);
            await adTaxIDTypeCommands.updateADTaxIDType(record,adTaxIDTypeid);
            await dbTransaction.commitTransaction();
        }
  
        response.success(req, res, adTaxIDTypeid, 201, "adTaxIDType record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adTaxIDType not updated!", 400, error.message); 
    }
};  

/**
 * Delete adTaxIDType
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.deleteADTaxIDType = async(req,res,next) => {
    try{
        const adTaxIDTypeid = req.query.adtaxidtypeid;
        const adTaxIDType = await adTaxIDTypeQueries.getADTaxIDTypeByID(adTaxIDTypeid);

        //Validate that record exists
        if( adTaxIDType.length == 0 )
            throw new Error("adTaxIDType record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adTaxIDTypeCommands.deleteADTaxIDType(adTaxIDTypeid);
        await changeLog.createADChangeLog(adUserID,"DELETE","adTaxIDType",adTaxIDTypeid,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adTaxIDTypeid, 201, "adTaxIDType record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adTaxIDType not deleted!", 400, error.message);
    }
} 

/**
 * Get adTaxIDType
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADTaxIDType = async (req,res,next) => {
    try{
        const adTaxIDTypeID = req.query.adtaxidtypeid != null ? req.query.adtaxidtypeid : "p.adtaxidtype";
        const adCountryID = req.query.adcountryid != null ? req.query.adcountryid : "p.adcountryid";
        const name = req.query.name != null ? "'" + req.query.name.toUpperCase() + "'" : "p.name";
        const code = req.query.code != null ? "'" + req.query.code.toUpperCase() + "'" : "p.code";


        const adTaxIDType = await adTaxIDTypeQueries.getADTaxIDType(adTaxIDTypeID,adCountryID,name,code);
        response.success(req, res, adTaxIDType, 200, adTaxIDType.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adTaxIDType not exists!", 400, error.message);
    }
} 