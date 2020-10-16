/**
 * Controler used to manage adLocation
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("./adChangeLogController");

const adLocationCommands = require("../infrastucture/commands/adLocation/adLocationCommandsModule");

const adClientQueries = require("../infrastucture/queries/adClient/adClientQueriesModule");
const adCountryQueries = require("../infrastucture/queries/adCountry/adCountryQueriesModule");

const adLocationQueries = require("../infrastucture/queries/adLocation/adLocationQueriesModule");

const AdLocationDTO = require("../infrastucture/models/adLocation/adLocationDTO");
const adLocationUpdateDTO = require("../infrastucture/models/adLocation/adLocationUpdateDTO");


/**
 * Create adLocation
 */
exports.createADLocation = async (req,res,next) => {
    try{
        const record = AdLocationDTO(
            req.body.adclientid,
            req.body.adcountryid,
            req.body.adregionid,
            req.body.adcityid,
            req.body.name,
            req.body.address1,
            req.body.address2,
            req.body.defaultlocation,
            req.body.postalcode,
            req.body.isactive,
            req.body.description,
            req.body.createdby
        );

        const adClientID=req.body.adclientid;
        const adCountryID=req.body.adcountryid;
        const adRegionID=req.body.adregionid;
        const adCityID=req.body.adcityid;

         //validate exists a record with the adclientid received
        const validClientID= await adClientQueries.getADClientByID(adClientID)
        if(validClientID.length === 0)
            throw new Error ("adclient record not exist") 
        
        //validate exists a record with the adcountry received
        const validCountryID= await adCountryQueries.getADContryByID(adCountryID)
        if(validCountryID.length === 0)
            throw new Error ("AdCountryID record not exist")
        
        //validate exists a record in adRegion Table with adregionid and adcountryid received
        const validRegionCountry = await adLocationQueries.getAdRegionCountry(adRegionID,adCountryID)
        if(validRegionCountry.length === 0)
            throw new Error ("there is no record in adregion table with adregionid and adcountryid received")
        
        //validate exists a record in adCity Table with adCityid and adregionid received
        const validCityRegion = await adLocationQueries.getAdCityRegion(adCityID,adRegionID)
        if(validCityRegion.length === 0)
            throw new Error ("there is no record in adCity table with adcityid and adregionid received")
        
        await dbTransaction.beginTransaction();
        const adLocation = await adLocationCommands.createADLocation(record);
        const adLocationID = adLocation[0].adlocationid;
        await changeLog.createADChangeLog(adLocationID,"INSERT","adLocation",adLocationID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adLocationID, 201, "adLocationID record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adLocationID not created!", 400, error.message);
    }
}

/**
 * Update adLocation
 */

 exports.updateADLocation  =  async (req,res,next) => {
    try{
        const adLocationID = req.query.adlocationid;
        const adLocation = await adLocationQueries.getADLocationByID(adLocationID);

        //Validate that record exists
        if( adLocation.length == 0 )
            throw new Error("adLocation record not exists");
        
            //Get values to update
        const adCountryID = req.body.adcountryid !== undefined ? req.body.adcountryid : adLocation[0].adcountryid;
        const adRegionID = req.body.adregionid !== undefined ? req.body.adregionid : adLocation[0].adregionid;    
        const adCityID = req.body.adcityid !== undefined ? req.body.adcityid : adLocation[0].adcityid;    
        const name = req.body.name !== undefined ? req.body.name.toLowerCase() : adLocation[0].name.toLowerCase();
        const address1 = req.body.address1 !== undefined ? req.body.address1.toLowerCase() : adLocation[0].address1.toLowerCase();
        const address2 = req.body.address2 !== undefined ? req.body.address2.toLowerCase() : adLocation[0].address2.toLowerCase();
        const defaultLocation = req.body.defaultlocation !== undefined ? req.body.defaultlocation : adLocation[0].defaultlocation;
        const postalCode = req.body.postalcode !== undefined ? req.body.postalcode.toLowerCase() : adLocation[0].postalcode.toLowerCase();
        const isactive = req.body.isactive !== undefined ? req.body.isactive : adLocation[0].isactive;
        const description = req.body.description !== undefined ? req.body.description.toLowerCase() : adLocation[0].description.toLowerCase();
        const adUserID = req.body.updatedby;


        const record = adLocationUpdateDTO(
            adCountryID,
            adRegionID,
            adCityID,
            name,
            address1,
            address2,
            defaultLocation,
            postalCode,
            isactive,
            description,
            adUserID,
        );

        if( adCountryID != adLocation[0].adcountryid || adRegionID != adLocation[0].adregionid || adCityID != adLocation[0].adcityid || name != adLocation[0].name || address1 != adLocation[0].address1 || address2 != adLocation[0].address2 || defaultLocation != adLocation[0].defaultlocation || postalCode != adLocation[0].postalcode || isactive != adLocation[0].isactive || description != adLocation[0].description){
            await dbTransaction.beginTransaction();

             //validate exists a record with the adcountry received
             const validCountryID= await adCountryQueries.getADContryByID(adCountryID)
             if(validCountryID.length === 0)
             throw new Error ("adCountry record not exist")
     
             //validate exists a record in adRegion Table with adregionid and adcountryid received
             const validRegionCountry = await adLocationQueries.getAdRegionCountry(adRegionID,adCountryID)
             if(validRegionCountry.length === 0)
                 throw new Error ("there is no record in adregion table with adregionid and adcountryid received")
             
             //validate exists a record in adCity Table with adCityid and adregionid received
             const validCityRegion = await adLocationQueries.getAdCityRegion(adCityID,adRegionID)
             if(validCityRegion.length === 0)
                 throw new Error ("there is no record in adCity table with adcityid and adregionid received")
                 //-------------



            if(adCountryID != adLocation[0].adcountryid)
                await changeLog.createADChangeLog(adUserID,"UPDATE","adLocation",adLocationID,"adCountryID",adLocation[0].adcountryid,adCountryID);

            if(adRegionID != adLocation[0].adregionid)
                await changeLog.createADChangeLog(adUserID,"UPDATE","adLocation",adLocationID,"adregionid",adLocation[0].adregionid,adRegionID);
               
            if(adCityID != adLocation[0].adcityid)
                await changeLog.createADChangeLog(adUserID,"UPDATE","adLocation",adLocationID,"adcity",adLocation[0].adcityid,adCityID); 
                   
            if(name != adLocation[0].name)
                await changeLog.createADChangeLog(adUserID,"UPDATE","adLocation",adLocationID,"name",adLocation[0].name,name);

            if(address1 != adLocation[0].address1)
                await changeLog.createADChangeLog(adUserID,"UPDATE","adLocation",adLocationID,"address1",adLocation[0].address1,address1); 

            if(address2 != adLocation[0].address2)
                await changeLog.createADChangeLog(adUserID,"UPDATE","adLocation",adLocationID,"address2",adLocation[0].address2,address2);
            
            if(defaultLocation != adLocation[0].defaultlocation)
                await changeLog.createADChangeLog(adUserID,"UPDATE","adLocation",adLocationID,"defaultLocation",adLocation[0].defaultlocation,defaultLocation);
            
            if(postalCode != adLocation[0].postalcode)
                await changeLog.createADChangeLog(adUserID,"UPDATE","adLocation",adLocationID,"postalCode",adLocation[0].postalcode,postalCode);    

            if(isactive != adLocation[0].isactive)    
                await changeLog.createADChangeLog(adUserID,"UPDATE","adLocation",adLocationID,"isactive",adLocation[0].isactive,isactive);
            
            if(description != adLocation[0].description)    
                await changeLog.createADChangeLog(adUserID,"UPDATE","adLocation",adLocationID,"description",adLocation[0].description,description);

            await adLocationCommands.updateADLocation(record,adLocationID);
            await dbTransaction.commitTransaction();
        }
  
        response.success(req, res, adLocationID, 201, "adLocation record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adLocation not updated!", 400, error.message); 
    }
};  

/**
 * Delete adLocation
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.deleteADLocation = async(req,res,next) => {
    try{
        const adLocationID = req.query.adlocationid;
        const adLocation = await adLocationQueries.getADLocationByID(adLocationID);

        //Validate that record exists
        if( adLocation.length == 0 )
            throw new Error("adLocation record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adLocationCommands.deleteADLocation(adLocationID);
        await changeLog.createADChangeLog(adUserID,"DELETE","adLocation",adLocationID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adLocationID, 201, "adLocationID record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adLocationID not deleted!", 400, error.message);
    }
} 

/**
 * Get adLocation
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADLocation = async (req,res,next) => {
    try{
        const adLocationID = req.query.adlocationid != null ? req.query.adlocationid : "p.adlocationid";
        const adClientID = req.query.adclientid != null ? req.query.adclientid : "p.adclientid";
        const adCountryID = req.query.adcountryid != null ? req.query.adcountryid : "p.adcountryid";
        const adRegionID = req.query.adregionid != null ? req.query.adregionid : "p.adregionid";
        const adCityID = req.query.adcityid != null ? req.query.adcityid : "p.adcityid";
        const name = req.query.name != null ? "'" + req.query.name.toLowerCase() + "'" : "p.name";
        const address1 = req.query.address1 != null ? "'" + req.query.address1.toLowerCase() + "'" : "p.address1";
        const address2 = req.query.address2 != null ? "'" + req.query.address2.toLowerCase() + "'" : "p.address2";
        const defaultLocation = req.query.defaultlocation != null ? "'" + req.query.defaultlocation + "'" : "p.defaultlocation";
        const postalCode = req.query.postalcode != null ? "'" + req.query.postalcode.toLowerCase() + "'" : "p.postalcode";
        const isactive = req.query.isactive != null ? "'" + req.query.isactive + "'" : "p.isactive";
        const description = req.query.description != null ? "'" + req.query.description.toLowerCase() + "'" : "p.description";



        const adLocation = await adLocationQueries.getADLocation(adLocationID,adClientID,adCountryID,adRegionID,adCityID,name,address1,address2,defaultLocation,postalCode,isactive,description);

        response.success(req, res, adLocation, 200, adLocation.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adLocation not exists!", 400, error.message);
    }
} 