const express = require("express");
const router = express.Router();

const customerController = require("../app/controllers/customerController");

// customerController.index
router.use("/sendEmail", customerController.sendEmail);
router.use("/", customerController.getAll);

module.exports = router;
