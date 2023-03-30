const PartyOrder = require('../models/PartyOrder');

class PartyOrderController {
    // [GET] /PartyOrder
    index(req, res, next) {
        PartyOrder.find({})
            .then(partyorder => res.json(partyorder))
            .catch(next);
    }

    // [GET] /PartyOrder/create


    // [PUT] /PartyOrder/:id
    

    // [DELETE] /PartyOrder/:id
}

module.exports = new PartyOrderController();
