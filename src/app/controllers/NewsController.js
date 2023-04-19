const News = require("../models/News");

class NewsController {
  // [GET] /news

  index(req, res, next) {
    const limit = req.query.limit;
    console.log(limit);
    if (limit) {
      News.find({})
        .limit(limit)
        .then((news) => res.json(news))

        .catch(next);
    } else {
      News.find({})
        .then((news) => res.json(news))

        .catch(next);
    }
  }
  // [GET] by news_id /news/:id

  getById(req, res, next) {
    News.findOne({ news_id: req.params.id })
      .then((news) => res.json(news))
      .catch(next);
  }

  // GET /news?limit=4&sort=-createdAt
  getLimit4(req, res, next) {
    const limit = parseInt(req.query.limit) || 4; // Lấy giá trị limit từ query params
    News.find()
      .sort({ _id: -1 })
      .limit(limit)
      .then((news) => res.json(news))
      .catch(next);
  }
  // [PUT] /news/:id

  // [DELETE] /news/:id
}

module.exports = new NewsController();
