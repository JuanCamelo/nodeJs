/**
 * Controler used to mange adWindow 
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("../controllers/adChangeLogController");

const adWindowCommands = require("../infrastucture/commands/adWindow/adWindowCommandsModule");

const adWindowQueries = require("../infrastucture/queries/AdWindow/adwindowQueriesModule");

const adWindowDTO = require("../infrastucture/models/adWindow/adWindowDTO");
const adWindowUpdateDTO = require("../infrastucture/models/adWindow/aDWindowUpdateDTO");




/**
 * Create adWindow 
 */
exports.createADWindow = async (req,res,next) => {
    try{
        const record = adWindowDTO(
            req.body.name,
            req.body.isactive,
            req.body.createdby
        );

        const name = req.body.name.toUpperCase();
        const adUserID = req.body.createdby;

        //Validate not exists a record with same name
        const valName = await adWindowQueries.getADWindowNameByID(name);
        if(valName.length > 0 )
            throw new Error("Exists a record with same name");
        
        await dbTransaction.beginTransaction();
        const adWuindow = await adWindowCommands.createADWindow(record);
        const adWuindowID = adWuindow[0].adwindowid;
        await changeLog.createADChangeLog(adUserID,"INSERT","adWindow",adWuindowID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adWuindowID, 201, "adWindow record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adWindow not created!", 400, error.message);
    }
}

/**
 * Update adWindow
 */
exports.updateADWindow  =  async (req,res,next) => {
    try{
        const adWindowID = req.query.adwindowid;
        const adWuindow = await adWindowQueries.getADwindowByID(adWindowID);

        //Validate that record exists
        if( adWuindow.length == 0 )
            throw new Error("adWindow record not exists");
        
        //Get values to update
        const name = req.body.name !== undefined ? req.body.name : adWuindow[0].name;
        const isactive = req.body.isactive !== undefined ? req.body.isactive : adWuindow[0].isactive;
        const adUserID = req.body.updatedby;

        const record = adWindowUpdateDTO(
            name,
            isactive,
            adUserID,
        );

        if( name != adWuindow[0].name || isactive !=adWuindow[0].isactive){
            await dbTransaction.beginTransaction();
            //Validate not exists a record with same name
            
            if( name != adWuindow[0].name ){
                const valName = await adWindowQueries.getADWindowNameByID(name.toUpperCase());
                if(valName.length > 0 )
                    throw new Error("Exists a record with same name");

                await changeLog.createADChangeLog(adUserID,"UPDATE","adWindow",adWindowID,"name",adWuindow[0].name,name);
            };

            // Validate isactive
            if( isactive != adWuindow[0].isactive ){
                await changeLog.createADChangeLog(adUserID,"UPDATE","adWindow",adWindowID,"isactive",adWuindow[0].isactive,isactive);
            };
            
            await adWindowCommands.updateADWindow(record,adWindowID);
            await dbTransaction.commitTransaction();
        };

        response.success(req, res, adWindowID, 201, "adWindow record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adWindow not updated!", 400, error.message); 
    };
};

/**
 * Delete ADWindow
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteADWindow = async(req,res,next) => {
    try{
        const adWindowID = req.query.adWuindowid;
        const adWindow  = await adWindowQueries.getADwindowByID(adWindowID);

        //Validate that record exists
        if( adWindow.length == 0 )
            throw new Error("adWindowid record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adWindowCommands.deleteADwindow(adWindowID);
        await changeLog.createADChangeLog(adUserID,"DELETE","adWindow",adWindowID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adWindowID, 201, "adWindow record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adWindow not deleted!", 400, error.message);
    }
}

/**
 * Get ADWindow
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADWindow = async (req,res,next) => {
    try{
        const adwindowid = req.query.adwindowid != null ? req.query.adwindowid : "p.adwindowid";
        const name = req.query.name != null ? "'" + req.query.name + "'" : "p.name";
        const isactive = req.query.isactive != null ? req.query.isactive : "p.isactive";
       
        const adWindow = await adWindowQueries.getADWindow(adwindowid,name,isactive);
        response.success(req, res, adWindow, 200, adWindow.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adWindow not exists!", 400, error.message);
    };
};