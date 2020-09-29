/**
 * Controler used to mange adParameters 
 */

const response = require("./responses/responses");
const dbTransaction = require("../infrastucture/commands/DBTransaction/DBTransactionCommandsModule");
const changeLog = require("../controllers/adChangeLogController");

const adParameterCommands = require("../infrastucture/commands/adParameter/adParameterCommandsModule");

const adParameterQueries = require("../infrastucture/queries/adParameter/adParameterQueriesModule");

const adParameterDTO = require("../infrastucture/models/adParameter/adParameterDTO");


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

        response.success(req, res, adParameter, 201, "adParameter record created successfully!");

    } catch(error){
        await dbTransaction.rollbackTransaction();
        response.error(req, res, "adParameter not created!", 400, error.message);
    }
}