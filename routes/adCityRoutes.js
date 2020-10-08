const express = require("express");
const adCityController = require("../controllers/adCityController");
const router = express.Router();

//POST /adCity - insert adCity record
router.post("/adcity", adCityController.createadCity);

//PUT /adCity - update adCity record
router.put("/adcity", adCityController.updateadCity);

//DELETE /adCity - update adCity record
router.delete("/adcity", adCityController.deleteadCity);

//GET /adCity - GET adCity records
router.get("/adcity", adCityController.getadCity);

module.exports = router;