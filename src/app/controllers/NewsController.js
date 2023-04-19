const News = require("../models/News");

class NewsController {
  // [GET] /news

  index(req, res, next) {
    News.find({})
      .then((news) => res.json(news))
      .catch(next);
  }

  // [GET] /news/create

  // [PUT] /news/:id

  // [DELETE] /news/:id
}

module.exports = new NewsController();
