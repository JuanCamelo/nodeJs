/**
 * Controler used to mange adParameters 
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("../controllers/adChangeLogController");

const adParameterCommands = require("../infrastucture/commands/adParameter/adParameterCommandsModule");

const adParameterQueries = require("../infrastucture/queries/adParameter/adParameterQueriesModule");

const adParameterDTO = require("../infrastucture/models/adParameter/adParameterDTO");
const adParameterUpdateDTO = require("../infrastucture/models/adParameter/adParameterUpdateDTO");


/**
 * Create adParameter
 */
exports.createADParameter = async (req,res,next) => {
    try{
        const record = adParameterDTO(
            req.body.type,
            req.body.name,
            req.body.value,
            req.body.list,
            req.body.createdby
        );

        const type = req.body.type.toUpperCase();
        const name = req.body.name.toUpperCase();
        const value = req.body.value.toUpperCase();
        const adUserID = req.body.createdby;

        //Validate not exists a record with same type and name
        const valTypeName = await adParameterQueries.getADParameterByTypeName(type,name);
        if(valTypeName.length > 0 )
            throw new Error("Exists a parameter with the relation type-name");
        
        //Validate not exists a record with same type and value if list is true
        if( req.body.list === true ){
            const valTypeValue = await adParameterQueries.getADParameterByTypeValue(type,value);
            if(valTypeValue.length > 0 )
                throw new Error("Exists a parameter with the relation type-vale");
        }
        await dbTransaction.beginTransaction();
        const adParameter = await adParameterCommands.createADParameter(record);
        const adParameterID = adParameter[0].adparameterid;
        await changeLog.createADChangeLog(adUserID,"INSERT","adParameter",adParameterID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adParameterID, 201, "adParameter record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adParameter not created!", 400, error.message);
    }
}

/**
 * Update adParameter
 */
exports.updateADParameter  =  async (req,res,next) => {
    try{
        const adParameterID = req.query.adparameterid;
        const adParameter = await adParameterQueries.getADParameterByID(adParameterID);

        //Validate that record exists
        if( adParameter.length == 0 )
            throw new Error("adParameter record not exists");
        
        //Get values to update
        const type = adParameter[0].type;
        const name = req.body.name !== undefined ? req.body.name : adParameter[0].name;
        const value = req.body.value !== undefined ? req.body.value : adParameter[0].value;
        const list = adParameter[0].list;
        const adUserID = req.body.updatedby;

        const record = adParameterUpdateDTO(
            type,
            name,
            value,
            list,
            adUserID,
        );

        if( name != adParameter[0].name || value != adParameter[0].value ){
            await dbTransaction.beginTransaction();
            //Validate not exists a record with same type and name
            
            if( name != adParameter[0].name ){
                const valTypeName = await adParameterQueries.getADParameterByTypeName(type.toUpperCase(),name.toUpperCase());
                if(valTypeName.length > 0 )
                    throw new Error("Exists a parameter with the relation type-name");

                await changeLog.createADChangeLog(adUserID,"UPDATE","adParameter",adParameterID,"name",adParameter[0].name,name);
            }
            if( value != adParameter[0].value ){
                //Validate not exists a record with same type and value if list is true
                if( list == true ){
                    const valTypeValue = await adParameterQueries.getADParameterByTypeValue(type.toUpperCase(),value.toUpperCase());
                    if(valTypeValue.length > 0 )
                        throw new Error("Exists a parameter with the relation type-vale");
                }
                await changeLog.createADChangeLog(adUserID,"UPDATE","adParameter",adParameterID,"value",adParameter[0].value,value);
            }

            await adParameterCommands.updateADParameter(record,adParameterID);
            await dbTransaction.commitTransaction();
        }

        response.success(req, res, adParameterID, 201, "adParameter record updated successfully!");

    } catch(error) {
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adParameter not updated!", 400, error.message); 
    }
};

/**
 * Delete ADParameter
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteADParameter = async(req,res,next) => {
    try{
        const adParameterID = req.query.adparameterid;
        const adParameter = await adParameterQueries.getADParameterByID(adParameterID);

        //Validate that record exists
        if( adParameter.length == 0 )
            throw new Error("adParameter record not exists");
        
        const adUserID = parseInt(req.query.deletedby);
        if( Number.isNaN(adUserID) )
            throw new Error("deletedBy is not valid");
        
        await dbTransaction.beginTransaction();
        await adParameterCommands.deleteADParameter(adParameterID);
        await changeLog.createADChangeLog(adUserID,"DELETE","adParameter",adParameterID,null,null,null);
        await dbTransaction.commitTransaction();

        response.success(req, res, adParameterID, 201, "adParameter record deleted successfully!");

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adParameter not created!", 400, error.message);
    }
}

/**
 * Get ADParameter
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getADParameter = async (req,res,next) => {
    try{
        const adparameterid = req.query.adparameterid != null ? req.query.adparameterid : "p.adparameterid";
        const type = req.query.type != null ? "'" + req.query.type + "'" : "p.type";
        const name = req.query.name != null ? "'" + req.query.name + "'" : "p.name";
        const value = req.query.value != null ? "'" + req.query.value + "'" : "p.value";
        const list = req.query.list != null ? req.query.list : "p.list";

        const adParameters = await adParameterQueries.getADParameter(adparameterid,type,name,value,list);
        response.success(req, res, adParameters, 200, adParameters.length);

    } catch (error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adParameter not exists!", 400, error.message);
    }
}