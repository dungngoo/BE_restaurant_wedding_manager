const Package = require("../models/Package");

class ServiceController {
  // Lấy tất cả các gói dịch vụ
  getAll(req, res, next) {
    Package.find({})
      .then((item) => res.json(item))
      .catch(next);
  }
  // Lấy gói dịch vụ theo tên
  async getPackageByName(req, res, next) {
    try {
      const packageName = req.params.packageName; // lấy tên gói dịch vụ từ request params
      const item = await Package.findOne({ packageName }).populate("services"); // tìm kiếm gói dịch vụ theo tên và populate danh sách dịch vụ
      if (!item) {
        return res
          .status(404)
          .json({ message: `Package ${packageName} not found` });
      }
      return res.json(item);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ServiceController();
