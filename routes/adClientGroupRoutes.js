const express = require("express");
const adClientGroupController = require("../controllers/adClientGroupController");
const router = express.Router();

//POST /adClientGroup - insert adClientGroup record
router.post("/adclientgroup", adClientGroupController.createADClientGroup);

//PUT /adClientGroup - update adClientGroup record
router.put("/adclientgroup", adClientGroupController.updateADClientGroup);

//DELETE /adClientGroup - update adClientGroup record
router.delete("/adclientgroup", adClientGroupController.deleteADClientGroup);

//GET /adClientGroup - GET adClientGroup records
router.get("/adclientgroup", adClientGroupController.getADClientGroup);

module.exports = router;