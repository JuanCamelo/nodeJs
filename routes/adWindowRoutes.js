const express = require("express");
const adWindowController = require("../controllers/adWindowController");
const router = express.Router();

//POST /adwindow - insert adwindow record
router.post("/adwindow", adWindowController.createADWindow);

//PUT /adwindow - update adwindow record
router.put("/adwindow", adWindowController.updateADWindow);

//DELETE /adwindow - update adwindow record
router.delete("/adwindow", adWindowController.deleteADWindow);

//GET /adwindow - GET adwindow records
router.get("/adwindow", adWindowController.getADWindow);


module.exports = router;