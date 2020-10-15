const express = require("express");
const adClientModuleController = require("../controllers/adClientModuleController");
const router = express.Router();

//POST /adClientModule - insert adClientModule record
router.post("/adclientmodule", adClientModuleController.createADClientModule);

//PUT /adClientModule - update adClientModule record
router.put("/adclientmodule", adClientModuleController.updateADClientModule);

//DELETE /adClientModule - update adClientModule record
router.delete("/adclientmodule", adClientModuleController.deleteADClientModule);

//GET /adClientModule - GET adClientModule records
router.get("/adclientmodule", adClientModuleController.getADClientModule);

module.exports = router;