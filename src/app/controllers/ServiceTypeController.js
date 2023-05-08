const ServiceType = require("../models/ServiceType");

class ServiceTypeController {
  // Lấy tất cả ServiceTypes
  getAll(req, res, next) {
    ServiceType.find({})
      .then((serviceType) => res.json(serviceType))
      .catch(next);
  }
  // Lấy ra 4 dịch vụ là Tiệc cưới, Hội nghị, Sự kiện, Outside
  async getServiceTypes(req, res, next) {
    try {
      const selectedServiceTypes = await ServiceType.find({
        name: {
          $in: ["Tiệc cưới", "Hội nghị", "Tiệc sự kiện", "Tiệc outside"],
        },
      });
      res.json(selectedServiceTypes);
    } catch (err) {
      next(err);
    }
  }
  // Lấy ra loại dịch vụ theo tên
  async getServiceByName(req, res, next) {
    const { name } = req.params;
    console.log(name);
    try {
      const selectedServiceTypes = await ServiceType.find({
        type: name,
      });
      res.json(selectedServiceTypes);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ServiceTypeController();
