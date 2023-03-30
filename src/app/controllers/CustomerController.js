const Customer = require('../models/Customer');

class CustomerController {
    // [GET] /customer
    index(req, res, next) {
        Customer.find({})
            .then(customers => res.json(customers))
            .catch(next);
    }

    // [GET] /customers/create


    // [PUT] /customers/:id
    

    // [DELETE] /customers/:id
}

module.exports = new CustomerController();
