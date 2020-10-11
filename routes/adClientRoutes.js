const express = require("express");
const adClientController = require("../controllers/adClientController");
const router = express.Router();

//POST /adClient - insert adClient record
router.post("/adclient", adClientController.createADClient);

//PUT /adClient - update adClient record
router.put("/adclient", adClientController.updateADClient);

//DELETE /adClient - update adClient record
//router.delete("/adclient", adClientController.deleteADClient);

//GET /adClient - GET adClient records
//router.get("/adclient", adClientController.getADClient);

module.exports = router;