const express = require("express");
const adParameterController = require("../controllers/adParameterController");
const router = express.Router();

//POST /adparameter - insert adParameter record
router.post("/adparameter", adParameterController.createADParameter);

//PUT /adparameter - update adParameter record
router.put("/adparameter", adParameterController.updateADParameter);

//DELETE /adparameter - update adParameter record
router.delete("/adparameter", adParameterController.deleteADParameter);

//GET /adparameter - GET adParameter records
router.get("/adparameter", adParameterController.getADParameter);

module.exports = router;