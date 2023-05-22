const express = require("express");
const router = express.Router();

const MenuItemController = require("../app/controllers/menuItemController");
router.use("/type", MenuItemController.getMenuItemsByCategory);
router.use("/search", MenuItemController.searchMenuCategories);
router.use("/:type", MenuItemController.getMenuItemByType);
router.use("/", MenuItemController.getAll);

module.exports = router;
