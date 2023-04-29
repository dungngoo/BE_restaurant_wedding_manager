const Service = require("../models/Service");

class ServiceController {
  // Lấy tất cả Services
  getAll(req, res, next) {
    Service.find({})
      .then((service) => res.json(service))
      .catch(next);
  }
  // [GET] /Service
  getServiceByServiceType(req, res, next) {
    const { type } = req.params;
    console.log(type);
    Service.findOne({ param: type })
      .then((service) => res.json(service))
      .catch(next);
  }
  // [GET] /Service/create

  // [PUT] /Service/:id

  // [DELETE] /Service/:id
}

module.exports = new ServiceController();
