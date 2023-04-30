const Event = require("../models/Event");

class EventController {
  // Lấy tất cả sự kiện
  getAll(req, res, next) {
    Event.find({})
      .then((event) => res.json(event))
      .catch(next);
  }
  async getEventsByParam(req, res) {
    try {
      const { param } = req.params;
      const events = await Event.find({ param: param }).sort("-1").limit(4);
      res.status(200).json({ events });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  // Lấy ra một sự kiện theo tên sự kiện
  async getEventByName(req, res) {
    try {
      const { name } = req.params;
      const event = await Event.findOne({ name: name });
      res.status(200).json({ event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new EventController();
