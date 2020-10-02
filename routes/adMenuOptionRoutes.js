const express = require("express");
const adMenuController = require("../controllers/adMenuController");
const router = express.Router();

//POST /adMenuOptions - insert adMenuOption record
router.post("/admenuOption", adMenuOptionController.createADMenuOption);

//PUT /admenuOptions - update adMenuOption record
router.put("/admenuOption", adMenuOptionController.updateADMenuOption);

//DELETE /admenuOptions - update admenuOption record
router.delete("/admenuOption", adMenuOptionController.deleteADMenuOption);


module.exports = router;