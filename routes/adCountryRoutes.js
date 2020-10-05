const express = require("express");
const adCountryController = require("../controllers/adCountryController");
const router = express.Router();

//POST /adcountry - insert adCountry record
router.post("/adcountry", adCountryController.createADCountry);

//PUT /adcountry - update adCountry record
router.put("/adcountry", adCountryController.updateADCountry);

//DELETE /adcountry - update adCountry record
router.delete("/adcountry", adCountryController.deleteADCountry);

//GET /adcountry - GET adCountry records
router.get("/adcountry", adCountryController.getADCountry);

module.exports = router;