const express = require("express");
const adRegionController = require("../controllers/adRegionController");
const router = express.Router();

//POST /adregion - insert adregion record
router.post("/adregion", adRegionController.createADRegion);

//PUT /adregion - update adregion record
router.put("/adregion", adRegionController.updateADRegion);

//DELETE /adregion - update adregion record
router.delete("/adregion", adRegionController.deleteADRegion);

//GET /adregion - GET adRegion records
router.get("/adregion", adRegionController.getADRegion);


module.exports = router;