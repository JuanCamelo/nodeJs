const express = require("express");
const adTaxIDTypeController = require("../controllers/adTaxIDTypeController");
const router = express.Router();

//POST /adtaxidtyperoutes - insert adTaxIdType record
router.post("/adtaxidtype", adTaxIDTypeController.createADTaxIDType);

//PUT /adtaxidtyperoutes - update adTaxIdType record
router.put("/adtaxidtype", adTaxIDTypeController.updateADTaxIDType);

//DELETE /adtaxidtyperoutes - delete adTaxIdType record
router.delete("/adtaxidtype", adTaxIDTypeController.deleteADTaxIDType);

//GET /adtaxidtyperoutes - get adTaxIdType record
router.get("/adtaxidtype", adTaxIDTypeController.getADTaxIDType);

module.exports = router;