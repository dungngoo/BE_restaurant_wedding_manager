const express = require("express");
const router = express.Router();

const MenuController = require("../app/controllers/MenuController");
router.use("/create", MenuController.createMenu);
router.use("/:type", MenuController.getMainDishesMenu);
router.use("/", MenuController.getAll);

module.exports = router;
