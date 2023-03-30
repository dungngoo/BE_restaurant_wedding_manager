const Bill = require('../models/Bill');

class BillController {
    // [GET] /bill
    index(req, res, next) {
        Bill.find({})
            .then(bills => res.json(bills))
            .catch(next);
    }

    // [GET] /bills/create


    // [PUT] /bills/:id
    

    // [DELETE] /bills/:id
}

module.exports = new BillController();
