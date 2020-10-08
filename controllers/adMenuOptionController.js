/**
 * Controler used to manage adMenuOptions 
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("./adChangeLogController");

const adMenuOptionCommands = require("../infrastucture/commands/adMenuOptions/adMenuOptionsCommandsModule");

const adMenuQueries = require("../infrastucture/queries/adMenu/adMenuQueriesModule");
const adMenuOptionQueries = require("../infrastucture/queries/adMenuOptions/adMenuOptionsQueriesModule");

const AdMenuOptionDTO = require("../infrastucture/models/adMenuOption/adMenuOptionDTO");
const adMenuOptionUpdateDTO = require("../infrastucture/models/adMenuOption/adMenuOptionUpdateDTO");


/**
 * Create adMenuOption
 */
exports.createADMenuOption = async (req,res,next) => {
    try{
        const record = AdMenuOptionDTO(
            req.body.admenuid,
            req.body.name,
            req.body.createdby
        );

        const name = req.body.name.toLowerCase();
        const adMenuID=req.body.admenuid

        //validate exists a record with the menuid received
        const validMenuID= await adMenuQueries.getADMenuByID(req.body.admenuid)
        if(validMenuID.length === 0)
            throw new Error ("admenuid record not exist")
        
        //Validate not exists a record with same name and adMenuid
        const validIDName = await adMenuOptionQueries.getADMenuOptionByIDName(adMenuID,name);
        if(validIDName.length >= 1 )
            throw new Error("Exists a record with the same name and adMenuID");
        
        await dbTransaction.beginTransaction();
        const adMenuOption = await adMenuOptionCommands.createADMenuOption(record);
        const adMenuIDOption = adMenuOption[0].admenuoptionid;
        await changeLog.createADChangeLog(adMenuIDOption,"INSERT","adMenuOption",adMenuIDOption,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adMenuIDOption, 201, "adMenuOption record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adMenuOption not created!", 400, error.message);
    }
}

/**
 * Update adMenuOption
 */

 exports.updateADMenuOption  =  async (req,res,next) => {
    try{
        const adMenuOptionID = req.query.admenuoptionid;
        const adMenuOption = await adMenuOptionQueries.getADMenuOptionByID(adMenuOptionID);

        //Validate that record exists
        if( adMenuOption.length == 0 )
            throw new Error("adMenuOption record not exists");

            //Get values to update
        const name = req.body.name !== undefined ? req.body.name.toLowerCase() : adMenuOption[0].name;
        const adUserID = req.body.updatedby;


        const record = adMenuOptionUpdateDTO(
            name,
            adUserID,
        );

        if( name != adMenuOption[0].name){
            await dbTransaction.beginTransaction();
        //Validate not exists a record with same name and adMenuid
            const validIDName = await adMenuOptionQueries.getADMenuOptionByIDName(adMenuOption[0].admenuid,name);
            if(validIDName.length >= 1 )
            throw new Error("Exists a record with the same name and adMenuID");

            await changeLog.createADChangeLog(adUserID,"UPDATE","adMenuOption",adMenuOptionID,"name",adMenuOption[0].name,name);
            await adMenuOptionCommands.updateADMenuOption(record,adMenuOptionID);
            await dbTransaction.commitTransaction();
        }
  
        response.success(req, res, adMenuOptionID, 201, "adMenuOption record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adMenuOption not updated!", 400, error.message); 
    }
};  

/**
 * Delete ADMenuOption
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.deleteADMenuOption = async(req,res,next) => {
    try{
        const adMenuOptionID = req.query.admenuoptionid;
        const adMenuOption = await adMenuOptionQueries.getADMenuOptionByID(adMenuOptionID);

        //Validate that record exists
        if( adMenuOption.length == 0 )
            throw new Error("adMenuOption record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adMenuOptionCommands.deleteADMenuOption(adMenuOptionID);
        await changeLog.createADChangeLog(adUserID,"DELETE","adMenuOption",adMenuOptionID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adMenuOptionID, 201, "adMenuOption record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adMenuOption not deleted!", 400, error.message);
    }
} 

/**
 * Get ADMenuOption
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADMenuOption = async (req,res,next) => {
    try{
        const adMenuOptionID = req.query.admenuoptionid != null ? req.query.admenuoptionid : "p.admenuoptionid";
        const adMenuID = req.query.admenuid != null ? req.query.admenuid : "p.admenuid";
        const name = req.query.name != null ? "'" + req.query.name + "'" : "p.name";

        const adMenuOption = await adMenuOptionQueries.getADMenuOption(adMenuOptionID,adMenuID,name);
        response.success(req, res, adMenuOption, 200, adMenuOption.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adMenuOption not exists!", 400, error.message);
    }
} 