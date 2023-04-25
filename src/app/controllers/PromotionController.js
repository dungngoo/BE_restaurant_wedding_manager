const Promotion = require("../models/Promotion");

class PromotionController {
  // [GET] /promotion
  index(req, res, next) {
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
  getById(req, res, next) {
    Promotion.findOne({ promotion_id: req.params.id })
      .then((promotion) => res.json(promotion))
      .catch(next);
  }

  // [GET] /promotion/create

  // [PUT] /promotion/:id

  // [DELETE] /promotion/:id
}

module.exports = new PromotionController();
