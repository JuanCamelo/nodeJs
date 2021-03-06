/**
 * Controler used to manage adMenus 
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("./adChangeLogController");

const adMenuCommands = require("../infrastucture/commands/adMenu/adMenuCommandsModule");

const adMenuQueries = require("../infrastucture/queries/adMenu/adMenuQueriesModule");

const adMenuDTO = require("../infrastucture/models/adMenu/adMenuDTO");
const adMenuUpdateDTO = require("../infrastucture/models/adMenu/adMenuUpdateDTO");


/**
 * Create adMenu
 */
exports.createADMenu = async (req,res,next) => {
    try{
        const record = adMenuDTO(
            req.body.name,
            req.body.createdby
        );

        const name = req.body.name.toUpperCase();

        //Validate not exists a record with same name
        const valName = await adMenuQueries.getADMenuByName(name);
        if(valName.length > 0 )
            throw new Error("Exists a record with the same name");
        
        await dbTransaction.beginTransaction();
        const adMenu = await adMenuCommands.createADMenu(record);
        const adMenuID = adMenu[0].admenuid;
        await changeLog.createADChangeLog(adMenuID,"INSERT","adMenu",adMenuID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adMenuID, 201, "adMenu record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adMenu not created!", 400, error.message);
    }
}

/**
 * Update adMenu
 */

 exports.updateADMenu  =  async (req,res,next) => {
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
  
        response.success(req, res, adMenuID, 201, "adMenu record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adMenu not updated!", 400, error.message); 
    }
};

/**
 * Delete ADMenu
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.deleteADMenu = async(req,res,next) => {
    try{
        const adMenuID = req.query.admenuid;
        const admenu = await adMenuQueries.getADMenuByID(adMenuID);
        const adMenuOption =  await adMenuQueries.getADMenuOptionByAdMenuID(adMenuID);

        //Validate that record exists
        if( admenu.length == 0 )
            throw new Error("adMenu record not exists");
        
        //Validate child tables   
        if( adMenuOption.length > 0 )
            throw new Error("the record can not be deleted because it has dependencies on a child table");    
        
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
} 

/**
 * Get ADMenu
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADMenu = async (req,res,next) => {
    try{
        const admenuid = req.query.admenuid != null ? req.query.admenuid : "p.admenuid";
        const name = req.query.name != null ? "'" + req.query.name + "'" : "p.name";

        const adMenu = await adMenuQueries.getADMenu(admenuid,name);
        response.success(req, res, adMenu, 200, adMenu.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adMenu not exists!", 400, error.message);
    }
}