const FoodMenu = require("../models/FoodMenu");

// Hàm tạo mới một FoodMenu
create = async (req, res) => {
  try {
    const { foodId, menuId } = req.body;
    const foodMenu = await FoodMenu.create({ food: foodId, menu: menuId });
    return res.status(201).json({ success: true, foodMenu });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Hàm lấy ra tất cả các FoodMenu
getAll = async (req, res) => {
  try {
    const foodMenus = await FoodMenu.find().populate("food").populate("menu");
    return res.status(200).json({ success: true, foodMenus });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Hàm cập nhật thông tin một FoodMenu theo id
updateById = async (req, res) => {
  try {
    const { foodId, menuId } = req.body;
    const foodMenu = await FoodMenu.findByIdAndUpdate(
      req.params.id,
      { food: foodId, menu: menuId },
      { new: true }
    );
    if (!foodMenu) {
      return res
        .status(404)
        .json({ success: false, message: "FoodMenu not found" });
    }
    return res.status(200).json({ success: true, foodMenu });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Hàm xóa một FoodMenu theo id
deleteById = async (req, res) => {
  try {
    const foodMenu = await FoodMenu.findByIdAndDelete(req.params.id);
    if (!foodMenu) {
      return res
        .status(404)
        .json({ success: false, message: "FoodMenu not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "FoodMenu has been deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  create,
  getAll,
  updateById,
  deleteById,
};
