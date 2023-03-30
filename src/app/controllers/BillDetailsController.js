const BillDetails = require('../models/BillDetails');

class BillDetailsController {
    // [GET] /billDetails
    index(req, res, next) {
        BillDetails.find({})
            .then(billDetailss => res.json(billDetailss))
            .catch(next);
    }

    // [GET] /billDetailss/create


    // [PUT] /billDetailss/:id
    

    // [DELETE] /billDetailss/:id
}

module.exports = new BillDetailsController();
