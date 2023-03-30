const Material = require('../models/Material');

class MaterialController {
    // [GET] /Material
    index(req, res, next) {
        Material.find({})
            .then(materials => res.json(materials))
            .catch(next);
    }

    // [GET] /Materials/create


    // [PUT] /Materials/:id
    

    // [DELETE] /Materials/:id
}

module.exports = new MaterialController();
