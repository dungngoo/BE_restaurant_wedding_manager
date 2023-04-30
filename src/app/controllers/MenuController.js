const Menu = require("../models/Menu");

class MenuController {
  // Lấy tất cả thực đơn
  getAll(req, res, next) {
    Menu.find({})
      .then((menu) => res.json(menu))
      .catch(next);
  }
  // Lấy thực đơn theo loại món ăn
  async getMainDishesMenu(req, res) {
    const { type } = req.params;
    try {
      const menu = await Menu.findOne({})
        .populate({
          path: "menuItems",
          match: { type: type },
        })
        .exec();

      res.send(menu.menuItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new MenuController();
