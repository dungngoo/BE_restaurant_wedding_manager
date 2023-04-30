const Service = require("../models/Service");
const ServiceType = require("../models/ServiceType");

class ServiceController {
  // Lấy tất cả Services
  getAll(req, res, next) {
    Service.find({})
      .then((service) => res.json(service))
      .catch(next);
  }
  // Lấy dịch vụ theo loại dịch vụ
  async getServiceByType(req, res, next) {
    const { type } = req.params;
    try {
      // Tìm kiếm tất cả các ServiceType có name là type
      const serviceTypes = await ServiceType.find({
        type: type,
      });
      if (serviceTypes.length === 0) {
        return res.status(404).json({ message: `ServiceTypes not found` });
      }
      // Lấy danh sách _id của các ServiceType đó
      const serviceTypeIds = serviceTypes.map((serviceType) => serviceType._id);

      // Tìm tất cả các Service có type trùng với các _id của các ServiceType này
      const services = await Service.find({
        type: { $in: serviceTypeIds },
      })
        .populate("type")
        .limit(4)
        .exec();

      res.json(services);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new ServiceController();
