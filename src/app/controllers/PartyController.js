const Party = require("../models/Party");

class PartyController {
  // [GET] /Party
  index(req, res, next) {
    const { limit, page } = req.query;
    Party.find({})
      .populate("services.service")
      .populate("customerId")
      .populate("lobbyId")
      .populate("menuId")
      .populate("serviceTypeId")
      .limit(limit)
      .skip(limit * (page - 1))
      .then((party) => res.json(party))
      .catch(next);
  }

  // [GET] /Party/create

  // [PUT] /Party/:id

  // [DELETE] /Party/:id
}

module.exports = new PartyController();
