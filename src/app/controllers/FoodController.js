const Food = require("../models/Food");

class FoodController {
  // Lấy tất cả món ăn
  getAll = async (req, res, next) => {
    try {
      const food = await Food.find();
      res.json(food);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // Lấy thông tin của một món ăn theo ID
  getFoodById = async (req, res, next) => {
    try {
      const food = await Food.findById(req.params.id);
      if (!food) throw new Error("Food not found");
      res.json(food);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  // Thêm một món ăn mới
  createFood = async (req, res, next) => {
    try {
      const newFood = new Food(req.body);
      const savedFood = await newFood.save();
      res.status(201).json(savedFood);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  // Cập nhật thông tin của một món ăn theo ID
  updateFoodById = async (req, res, next) => {
    try {
      const updatedFood = await Food.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedFood);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  // Xóa một món ăn theo ID
  deleteFoodById = async (req, res, next) => {
    try {
      const deletedFood = await Food.findByIdAndDelete(req.params.id);
      res.json(deletedFood);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

module.exports = new FoodController();
