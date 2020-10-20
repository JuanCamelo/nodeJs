const express = require("express");
const adUserController = require("../controllers/adUserController");
const router = express.Router();

//POST /adUser - insert adUser record
router.post("/aduser", adUserController.createADUser);

//PUT /adUser - update adUser record
router.put("/aduser", adUserController.updateADUser);

//DELETE /adUser - update adUser record
router.delete("/aduser", adUserController.deleteADUser);

//GET /adUser - GET adUser records
router.get("/aduser", adUserController.getADUser);

module.exports = router;