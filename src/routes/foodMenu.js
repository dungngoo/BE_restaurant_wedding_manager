const express = require("express");
const router = express.Router();

const foodMenuController = require("../app/controllers/FoodMenuController");

// foodMenuController.getAll ---  Lấy tất cả món ăn và thực đơn

router.use("/", foodMenuController.getAll);

module.exports = router;
