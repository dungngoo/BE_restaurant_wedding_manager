const express = require("express");
const router = express.Router();

const foodController = require("../app/controllers/FoodController");

// foodController.getAll ---  Lấy tất cả món ăn

router.use("/", foodController.getAll);

module.exports = router;
