const express = require("express");
const adWindowRoleController = require("../controllers/adWindowRoleController");
const router = express.Router();

//POST /adwindowrole - insert adwindowrole record
router.post("/adwindowrole", adWindowRoleController.createADWindowRole);

//PUT /adwindowrole - update adwindowrole record
router.put("/adwindowrole", adWindowRoleController.updateADWindowRole);

//DELETE /adwindowrole - update adwindowrole record
router.delete("/adwindowrole", adWindowRoleController.deleteADWindowRole);

//GET /adwindowrole - GET adwindowrole records
router.get("/adwindowrole", adWindowRoleController.getADWindowRole);


module.exports = router;