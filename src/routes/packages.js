const express = require("express");
const router = express.Router();

const PackageController = require("../app/controllers/PackageController");
router.use("/:packageName", PackageController.getPackageByName);
router.use("/", PackageController.getAll);

module.exports = router;
