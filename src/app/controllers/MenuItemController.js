const MenuItem = require("../models/MenuItem");

class MenuItemController {
  // Lấy tất cả món ăn
  getAll(req, res, next) {
    MenuItem.find({})
      .then((menuItem) => res.json(menuItem))
      .catch(next);
  }
  //   Lấy món ăn theo loại
  getMenuItemByType(req, res, next) {
    console.log(req.params.type);
    MenuItem.find({ type: req.params.type })
      .then((menuItem) => res.json(menuItem))
      .catch(next);
  }
  // Lấy món ăn theo 4 loại món chính, món phụ, món khai vị, món tráng miệng
  async getMenuItemsByType(req, res) {
    try {
      const menuitems = await MenuItem.aggregate([
        { $match: { available: true } }, // Lọc các món ăn có sẵn
        { $group: { _id: "$type", items: { $push: "$$ROOT" } } }, // Nhóm các món theo loại
        { $replaceRoot: { newRoot: { $arrayElemAt: ["$items", 0] } } }, // Lấy một món đầu tiên trong từng nhóm
        { $sort: { type: 1 } }, // Sắp xếp theo thứ tự tăng dần của trường type// Lấy một món đầu tiên trong từng nhóm
      ]).exec();
      res.send(menuitems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new MenuItemController();
