const Menu = require("../models/Menu");
const MenuItem = require("../models/MenuItem");
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

  createMenu(req, res) {
    // Tạo menu
    const menu = new Menu({
      name: "Menu thực đơn thử nghiệm",
      description: "Thực đơn thử nghiệm chứa các món ăn khác nhau",
    });

    // Lưu các món ăn vào mảng items của menu
    MenuItem.find({
      name: {
        $in: [
          "Súp gà ngô kem",
          "Salad rau tôm",
          "Gà hấp lá chanh",
          "Tôm chiên hoàng bào",
          "Mực chiên bơ tỏi",
          "Cá chép chiên xù",
          "Canh bong thập cẩm",
          "Xôi gấc",
          "Cơm tám",
          "Hoa quả",
          "Bia HN",
          "Nước ngọt",
        ],
      },
    })
      .then((items) => {
        menu.items = items.map((item) => item._id);
        return menu.save();
      })
      .then(() => console.log("Menu đã được tạo thành công"))
      .catch((err) => console.log(err));
  }
}

module.exports = new MenuController();
