const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");
const middlewareController = require("../app/controllers/middlewareController");

// adminController.index
router.post("/login", adminController.login);
router.use("/logout", adminController.logout);

module.exports = router;
