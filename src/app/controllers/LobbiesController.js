const Lobby = require("../models/Lobby");

class LobbyController {
  // Lấy tất cả lobbies
  getAll(req, res, next) {
    Lobby.find({})
      .then((lobby) => res.json(lobby))
      .catch(next);
  }
  // [GET] /Lobby
  getLobbyByConstant(req, res, next) {
    const { constant } = req.params;
    console.log(constant);
    Lobby.findOne({ constant: constant })
      .then((lobby) => res.json(lobby))
      .catch(next);
  }
  // [GET] /Lobby/create

  // [PUT] /Lobby/:id

  // [DELETE] /Lobby/:id
}

module.exports = new LobbyController();
