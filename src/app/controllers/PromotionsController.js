const Promotion = require("../models/Promotion");
const ServiceType = require("../models/ServiceType");

class PromotionsController {
  // [GET] /promotion
  getAll(req, res, next) {
    const { _limit } = req.query;
    Promotion.find({})
      .then((promotion) => {
        if (_limit) {
          res.json(promotion.slice(0, _limit));
        } else {
          res.json(promotion);
        }
      })
      .catch(next);
  }

  //   [GET] /promotion/:id
  getPromotionByParam(req, res, next) {
    const { param } = req.params;
    console.log(param);
    Promotion.findOne({ param: param })
      .then((promotion) => res.json(promotion))
      .catch(next);
  }

  async getPromotionByServiceType(req, res) {
    try {
      // Tìm kiếm tất cả các ServiceType có name là "Tiệc cưới", "Tiệc sự kiện" hoặc "Tiệc outside"
      const serviceTypes = await ServiceType.find({
        name: {
          $in: ["Tiệc cưới", "Tiệc sự kiện", "Hội nghị", "Tiệc outside"],
        },
      });
      if (serviceTypes.length === 0) {
        return res.status(404).json({ message: `ServiceTypes not found` });
      }
      // Lấy danh sách _id của các Service đó
      const serviceIds = serviceTypes.map((service) => service._id);

      // Tìm tất cả các Promotion có serviceType trùng với các _id của các Service này
      const promotions = await Promotion.find({
        serviceType: { $in: serviceIds },
      })
        .populate("serviceType")
        .limit(4)
        .exec();

      res.json(promotions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new PromotionsController();
