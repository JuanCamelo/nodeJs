const express = require("express");
const adRoleController = require("../controllers/adRoleController");
const router = express.Router();

//POST /adRole - insert adRole record
router.post("/adrole", adRoleController.createADRole);

//PUT /adRole - update adRole record
router.put("/adrole", adRoleController.updateADRole);

//DELETE /adRole - update adRole record
router.delete("/adrole", adRoleController.deleteADRole);

//GET /adRole - GET adRole records
router.get("/adrole", adRoleController.getADRole);

module.exports = router;