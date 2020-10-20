const express = require("express");
const adLocationController = require("../controllers/adLocationController");
const router = express.Router();

//POST /adLocation - insert adLocation record
router.post("/adlocation", adLocationController.createADLocation);

//PUT /adLocation - update adLocation record
router.put("/adlocation", adLocationController.updateADLocation);

//DELETE /adLocation - update adLocation record
router.delete("/adlocation", adLocationController.deleteADLocation);

//GET /adLocation - GET adLocation records
router.get("/adlocation", adLocationController.getADLocation);

module.exports = router;