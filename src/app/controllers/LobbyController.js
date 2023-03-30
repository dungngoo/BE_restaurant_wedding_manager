const Lobby = require('../models/Lobby');

class LobbyController {
    // [GET] /Lobby
    index(req, res, next) {
        Lobby.find({})
            .then(lobby => res.json(lobby))
            .catch(next);
    }

    // [GET] /Lobby/create


    // [PUT] /Lobby/:id
    

    // [DELETE] /Lobby/:id
}

module.exports = new LobbyController();
