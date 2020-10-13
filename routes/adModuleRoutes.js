const express = require("express");
const adModuleController = require("../controllers/adModuleControllers");
const router = express.Router();

//POST /adModule - insert Module record
router.post("/admodule", adModuleController.createADModule);

//PUT /adModule - update adModule record
router.put("/admodule", adModuleController.updateADModule);

//DELETE /adModule - update admodule record
router.delete("/admodule", adModuleController.deleteADModule);

//GET /adModule - GET adModule records
router.get("/admodule", adModuleController.getADModule);


module.exports = router;