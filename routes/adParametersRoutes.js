const express = require("express");
const adParameterController = require("../controllers/adParameterController");
const router = express.Router();

//POST /parameter - adParameter record
router.post("/adparameter", adParameterController.createADParameter);

module.exports = router;