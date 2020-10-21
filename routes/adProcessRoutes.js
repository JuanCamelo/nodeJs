const express = require("express");
const adProcessController = require("../controllers/adProcessController");
const router = express.Router();

//POST /adProcess - insert adProcess record
router.post("/adprocess", adProcessController.createADProcess);

//PUT /adProcess- update adProcess record
router.put("/adprocess", adProcessController.updateADProcess);

//DELETE /adProcess - update adProcess record
router.delete("/adprocess", adProcessController.deleteADProcess);

//GET /adProcess - GET adProcess records
router.get("/adprocess", adProcessController.getADProcess);


module.exports = router;