const MenuItem = require("../models/MenuItem");

class MenuItemController {
  // Lấy tất cả món ăn
  getAll(req, res, next) {
    MenuItem.find({})
      .then((menuItem) => res.json(menuItem))
      .catch(next);
  }
  //   Lấy món ăn theo loại

  async getMenuItemByType(req, res, next) {
    const { type } = req.params;
    try {
      const { _page, _limit } = req.query;
      console.log(_page);
      console.log(_limit);
      console.log(type);
      const startIndex = (_page - 1) * _limit;
      const endIndex = startIndex + parseInt(_limit);
      console.log(req.params.type);
      const totalCategories = await MenuItem.countDocuments({
        type: type,
      });
      const totalPages = Math.ceil(totalCategories / _limit);

      const currentMenuItem = await MenuItem.find({ type: req.params.type })
        .skip(startIndex)
        .limit(parseInt(_limit));

      res.json({
        data: currentMenuItem,
        pagination: {
          _page,
          _limit,
          _totalRows: totalCategories,
          _totalPages: totalPages,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  // Lấy món ăn theo category
  async getMenuItemsByCategory(req, res) {
    const { _page, _limit } = req.query;
    const startIndex = (_page - 1) * _limit;
    const endIndex = startIndex + parseInt(_limit);

    try {
      const menuitems = await MenuItem.aggregate([
        { $match: { available: true } }, // Lọc các món ăn có sẵn
        { $group: { _id: "$type", items: { $push: "$$ROOT" } } }, // Nhóm các món theo category
        { $sort: { _id: 1 } }, // Sắp xếp theo thứ tự tăng dần của trường category
      ]).exec();

      const totalCategories = menuitems.length;
      const totalPages = Math.ceil(totalCategories / _limit);
      const currentCategories = menuitems.slice(startIndex, endIndex);

      res.json({
        data: currentCategories,
        pagination: {
          _page,
          _limit,
          _totalRows: totalCategories,
          _totalPages: totalPages,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async searchMenuCategories(req, res, next) {
    const { search } = req.query;
    console.log(search);
    try {
      const searchResults = await MenuItem.findOne({
        type: { $regex: search, $options: "i" },
      });

      console.log("Kết quả tìm kiếm:", searchResults);
      res.send(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new MenuItemController();
