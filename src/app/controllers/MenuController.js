const mongoose = require("mongoose");
const Menu = require("../models/Menu");


// Tạo mới một menu
createMenu = async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).json(menu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy tất cả các menu
getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate("items.food", "name price");
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy một menu theo ID
getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate(
      "items.food",
      "name price"
    );
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật một menu theo ID
updateMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    Object.assign(menu, req.body);
    await menu.save();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa một menu theo ID
deleteMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    await menu.remove();
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMenu,
  getAllMenus,
  getMenuById,
  updateMenuById,
  deleteMenuById,
};
