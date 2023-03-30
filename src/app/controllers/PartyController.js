const Party = require('../models/Party');

class PartyController {
    // [GET] /Party
    index(req, res, next) {
        Party.find({})
            .then(party => res.json(party))
            .catch(next);
    }

    // [GET] /Party/create


    // [PUT] /Party/:id
    

    // [DELETE] /Party/:id
}

module.exports = new PartyController();
