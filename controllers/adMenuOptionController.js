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
//const adMenuOptionUpdateDTO = require("../infrastucture/models/adMenuOption/adMenuOptionUpdateDTO");


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

        const name = req.body.name.toUpperCase();
        const adMenuID=req.body.admenuid

        //validate exists a record with the menuid received
        const validMenuID= await adMenuQueries.getADMenuByID(req.body.admenuid)
        if(validMenuID.length === 0)
            throw new Error ("admenuid record not exist")
        
        //Validate not exists a record with same name and adMenuid
        const validIDName = await adMenuOptionQueries.getADMenuOptionByIDName(adMenuID,name);
        if(validIDName.length >= 0 )
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

/*  exports.updateADMenu  =  async (req,res,next) => {
    try{
        const adMenuID = req.query.admenuid;
        const adMenu = await adMenuQueries.getADMenuByID(adMenuID);

        //Validate that record exists
        if( adMenu.length == 0 )
            throw new Error("adMenu record not exists");
        
        //Get values to update
        const name = req.body.name !== undefined ? req.body.name : adMenu[0].name;
        const adUserID = req.body.updatedby;

        const record = adMenuUpdateDTO(
            name,
            adUserID,
        );

        if( name != adMenu[0].name){
            await dbTransaction.beginTransaction();
            //Validate not exists a record with same type and name
                 const valName = await adMenuQueries.getADMenuByName(name.toUpperCase());
                if(valName.length > 0 )
                    throw new Error("Exists a menu with the same name");

                await changeLog.createADChangeLog(adUserID,"UPDATE","adMenu",adMenuID,"name",adMenu[0].name,name);
            
            

            await adMenuCommands.updateADMenu(record,adMenuID);
            await dbTransaction.commitTransaction();
        }
  
        response.success(req, res, adParameterID, 201, "adMenu record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adMenu not updated!", 400, error.message); 
    }
}; */

/**
 * Delete ADMenuOption
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
/*  exports.deleteADMenu = async(req,res,next) => {
    try{
        const adMenuID = req.query.admenuid;
        const admenu = await adMenuQueries.getADMenuByID(adMenuID);

        //Validate that record exists
        if( admenu.length == 0 )
            throw new Error("adMenu record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adMenuCommands.deleteADMenu(adMenuID);
        await changeLog.createADChangeLog(adUserID,"DELETE","adMenu",adMenuID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adMenuID, 201, "adMenu record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adMenu not deleted!", 400, error.message);
    }
}  */

/**
 * Get ADMenu
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
/* exports.getADMenu = async (req,res,next) => {
    try{
        const admenuid = req.query.admenuid != null ? req.query.admenuid : "p.admenuid";
        const name = req.query.name != null ? "'" + req.query.name + "'" : "p.name";

        const adMenu = await adMenuQueries.getADMenu(admenuid,name);
        response.success(req, res, adMenu, 200, adMenu.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adMenu not exists!", 400, error.message);
    }
} */