const express = require("express");
const adMenuController = require("../controllers/adMenuController");
const router = express.Router();

//POST /adparameter - insert adParameter record
router.post("/admenu", adMenuController.createAdMenu);

//PUT /adparameter - update adParameter record
router.put("/admenu/:id", adMenuController.updateADMenu);

//DELETE /adparameter - update adParameter record
//router.delete("/adparameter", adParameterController.deleteADParameter);

//GET /adparameter - GET adParameter records
//router.get("/adparameter", adParameterController.getADParameter);

module.exports = router;