const express = require("express");
const router = express.Router();

const menuController = require("../app/controllers/MenuController");

// menuController.getAll ---  Lấy tất cả món ăn

router.use("/", menuController.getAllMenus);

module.exports = router;
