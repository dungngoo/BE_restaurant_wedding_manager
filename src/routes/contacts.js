const express = require("express");
const router = express.Router();

const contactController = require("../app/controllers/ContactController");

// contactController.index
router.use("/sendEmail", contactController.sendEmail);
router.use("/", contactController.getAll);

module.exports = router;
