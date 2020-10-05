const express = require("express");
const adMenuOptionController = require("../controllers/adMenuOptionController");
const router = express.Router();

//POST /adMenuOptions - insert adMenuOption record
router.post("/admenuoption", adMenuOptionController.createADMenuOption);

//PUT /admenuOptions - update adMenuOption record
router.put("/admenuoption", adMenuOptionController.updateADMenuOption);

//DELETE /admenuOptions - update admenuOption record
router.delete("/admenuoption", adMenuOptionController.deleteADMenuOption);

//GET /admenuoption - GET adMenuOption records
router.get("/admenuoption", adMenuOptionController.getADMenuOption);

module.exports = router;