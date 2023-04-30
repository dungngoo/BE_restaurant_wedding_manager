const express = require("express");
const router = express.Router();

const MenuItemController = require("../app/controllers/MenuItemController");
router.use("/type", MenuItemController.getMenuItemsByType);
router.use("/:type", MenuItemController.getMenuItemByType);
router.use("/", MenuItemController.getAll);

module.exports = router;
