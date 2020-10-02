const express = require("express");
const adMenuController = require("../controllers/adMenuController");
const router = express.Router();

//POST /adMenu - insert adMenur record
router.post("/admenu", adMenuController.createADMenu);

//PUT /adMenu - update adMenu record
router.put("/admenu", adMenuController.updateADMenu);

//DELETE /admenu - update admenu record
router.delete("/admenu", adMenuController.deleteADMenu);

//GET /admenu - GET adMenu records
router.get("/admenu", adMenuController.getADMenu);

module.exports = router;