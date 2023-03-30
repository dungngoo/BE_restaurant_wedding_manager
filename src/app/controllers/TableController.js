const Table = require('../models/Table');

class TableController {
    // [GET] /table
    index(req, res, next) {
        Table.find({})
            .then(table => res.json(table))
            .catch(next);
    }

    // [GET] /table/create


    // [PUT] /table/:id
    

    // [DELETE] /table/:id
}

module.exports = new TableController();
