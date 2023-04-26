// Bảng món ăn - thực đơn

const mongoose = require("mongoose");
const foodMenuSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
  },
});

mongoose.model("FoodMenu", foodMenuSchema);
