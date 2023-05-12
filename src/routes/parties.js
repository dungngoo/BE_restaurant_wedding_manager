const express = require("express");
const router = express.Router();

const partyController = require("../app/controllers/partyController");
// router.use("/:packageName", partyController.inde);
router.use("/", partyController.index);

module.exports = router;
