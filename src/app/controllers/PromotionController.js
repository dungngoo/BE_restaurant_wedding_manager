const Promotion = require('../models/Promotion');

class PromotionController {
    // [GET] /promotion
    index(req, res, next) {
        Promotion.find({})
            .then(promotion => res.json(promotion))
            .catch(next);
    }

    // [GET] /promotion/create


    // [PUT] /promotion/:id
    

    // [DELETE] /promotion/:id
}

module.exports = new PromotionController();
