/**
 * Controler used to manage adUser
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("./adChangeLogController");

const adUserCommands = require("../infrastucture/commands/adUser/adUserCommandsModule");

const adClientQueries = require("../infrastucture/queries/adClient/adClientQueriesModule");
const adRoleQueries = require("../infrastucture/queries/adRole/adRoleQueriesModule");
const adParameterQueries = require("../infrastucture/queries/adParameter/adParameterQueriesModule")
const adUserQueries = require("../infrastucture/queries/adUser/adUserQueriesModule");


const AdUserDTO = require("../infrastucture/models/adUser/adUserDTO");
const adUserUpdateDTO = require("../infrastucture/models/adUser/adUserUpdateDTO");


/**
 * Create adUser
 */
exports.createADUser = async (req,res,next) => {
    try{
        const record = AdUserDTO(
            req.body.adclientid,
            req.body.adroleid,
            req.body.name,
            req.body.email,
            req.body.phonenumber,
            req.body.language,
            req.body.avatar,
            req.body.isactive,
            req.body.createdby
        );
        

        const adRoleID = req.body.adroleid;
        const adClientID = req.body.adclientid;
        const email = req.body.email.toUpperCase();
        const language = req.body.language;


        //validate exists a record with the adclientid received
        const validClientID= await adClientQueries.getADClientByID(adClientID)
        if(validClientID.length === 0)
            throw new Error ("adclient record not exist")
        
        //validate exists a record with the adroleid received
        const validRoleID= await adRoleQueries.getADRoleByID(adRoleID)
        if(validRoleID.length === 0)
            throw new Error ("adRole record not exist") 

        //validate not exists a record with the email received
        const validEmail= await adUserQueries.getADUserByEmail(email)
        if(validEmail.length > 0)
            throw new Error ("Exist a record with email received") 
         
        //validate email estructure
        const validateEmail= /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
        if(!validateEmail.test(email))
            throw new Error ("Estructure email invalid")    
         
            
        // validate language 
        if(language != undefined){
            const validLanguage = await adParameterQueries.getADParameterByTypeValue("LANGUAGES",language.toUpperCase())
            if(validLanguage.length === 0 )
                throw new Error(" There is no record in the parameters table with language received")
        }    
        
        await dbTransaction.beginTransaction();
        const adUser = await adUserCommands.createADUser(record);
        const adUserID = adUser[0].aduserid;
        await changeLog.createADChangeLog(adUserID,"INSERT","adUser",adUserID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adUserID, 201, "adUser record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adUser not created!", 400, error.message);
    }
}

/**
 * Update adUser
 */

 exports.updateADUser  =  async (req,res,next) => {
    try{
        const adUserID = req.query.aduserid;
        const adUser = await adUserQueries.getADUserByID(adUserID);

        //Validate that record exists
        if( adUser.length == 0 )
            throw new Error("adUser record not exists");

            //Get values to update
        const adroleid = req.body.adroleid !== undefined ? req.body.adroleid : adUser[0].adroleid;  
        const name = req.body.name !== undefined ? req.body.name : adUser[0].name;  
        const phonenumber = req.body.phonenumber ? req.body.phonenumber : adUser[0].phonenumber;
        const language = req.body.language ? req.body.language : adUser[0].language;
        const avatar = req.body.avatar ? req.body.avatar : adUser[0].avatar;
        const isactive = req.body.isactive !== undefined ? req.body.isactive : adRole[0].isactive;
        const UserID = req.body.updatedby;


        const record = adUserUpdateDTO(
            adroleid,
            name,
            phonenumber,
            language,
            avatar,
            isactive,
            UserID,
        );

        if( adroleid != adUser[0].adroleid || name != adUser[0].name || phonenumber != adUser[0].phonenumber || language != adUser[0].language || avatar != adUser[0].avatar || isactive != adUser[0].isactive){
            await dbTransaction.beginTransaction();

        //validate exists a record with the adroleid received
        const validRoleID= await adRoleQueries.getADRoleByID(adroleid)
        if(validRoleID.length === 0)
            throw new Error ("adRole record not exist")

            // validate language 
        if(language != adUser[0].language){
            const validLanguage = await adParameterQueries.getADParameterByTypeValue("LANGUAGES",language.toUpperCase())
            if(validLanguage.length === 0 )
                throw new Error(" There is no record in the parameters table with language received")
        }
            if(adroleid != adUser[0].adroleid){
                await changeLog.createADChangeLog(UserID,"UPDATE","adUser",adUserID,"adroleid",adUser[0].adroleid,adroleid);
            }
            
            if(name != adUser[0].name)
                await changeLog.createADChangeLog(UserID,"UPDATE","adUser",adUserID,"name",adUser[0].name,name);
            
            if(phonenumber != adUser[0].phonenumber){
                await changeLog.createADChangeLog(UserID,"UPDATE","adUser",adUserID,"phone",adUser[0].phonenumber,phonenumber);
            }
            
            if(language != adUser[0].language){
                await changeLog.createADChangeLog(UserID,"UPDATE","adUser",adUserID,"language",adUser[0].language,language);
            }

            if(avatar != adUser[0].avatar){
                await changeLog.createADChangeLog(UserID,"UPDATE","adUser",adUserID,"avatar",adUser[0].avatar,avatar);
            }

            if(isactive != adUser[0].isactive)    
                 await changeLog.createADChangeLog(UserID,"UPDATE","adUser",adUserID,"isactive",adUser[0].isactive,isactive);

            await adUserCommands.updateADUser(record,adUserID);
            await dbTransaction.commitTransaction();
        }
  
        response.success(req, res, adUserID, 201, "adUser record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adUser not updated!", 400, error.message); 
    }
};   

/**
 * Delete adUser
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  exports.deleteADUser = async(req,res,next) => {
    try{
        const adUserID = req.query.aduserid;
        const adUser = await adUserQueries.getADUserByID(adUserID);

        //Validate that record exists
        if( adUser.length == 0 )
            throw new Error("adUser record not exists");
        
        const UserID = parseInt(req.query.deletedby);
        if( Number.isNaN(UserID))
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adUserCommands.deleteADUser(adUserID);
        await changeLog.createADChangeLog(UserID,"DELETE","adUser",adUserID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adUserID, 201, "adUserID record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adUserID not deleted!", 400, error.message);
    }
}  

/**
 * Get ADUser
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADUser = async (req,res,next) => {
    try{

        const aduserid = req.query.aduserid != null ? req.query.aduserid: "p.aduserid";
        const adclientid = req.query.adclientid != null ? req.query.adclientid: "p.adclientid"; 
        const adroleid = req.query.adroleid != null ? req.query.adroleid: "p.adroleid";
        const name = req.query.name != null ? "'" + req.query.name.toUpperCase() + "'" : "p.name";
        const email = req.query.email != null ? "'" + req.query.email.toUpperCase() +"'": "p.email";
        const phonenumber = req.query.phonenumber != null ? "'" + req.query.phonenumber  + "'": "p.phonenumber";
        const language = req.query.language != null ? "'" + req.query.language.toUpperCase() + "'": "p.language";
        const avatar = req.query.avatar != null ? "'" + req.query.avatar.toUpperCase()  + "'": "p.avatar";
        const isactive = req.query.isactive != null ? req.query.isactive: "p.isactive";


        const adUser = await adUserQueries.getADUser(aduserid,adclientid,adroleid,name,email,phonenumber,language,avatar,isactive);
        response.success(req, res, adUser, 200, adUser.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adUser not exists!", 400, error.message);
    }
}  