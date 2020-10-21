const express = require("express");
const adProcessRoleController = require("../controllers/adProcessRoleController");
const router = express.Router();

//POST /adProcessRole - insert adProcessRole record
router.post("/adprocessrole", adProcessRoleController.createADProcessRole);

//PUT /adProcessRole - update adProcessRole record
router.put("/adprocessrole", adProcessRoleController.updateADProcessRole);

//DELETE /adProcessRole - update adProcessRole record
router.delete("/adprocessrole", adProcessRoleController.deleteADProcessRole);

//GET /adProcessRole - GET adProcessRole records
router.get("/adprocessrole", adProcessRoleController.getADProcessRole);


module.exports = router;