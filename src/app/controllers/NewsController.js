const News = require("../models/News");

class NewsController {
  // [GET] /news
  index(req, res, next) {
    const { _page, _limit } = req.query;
    console.log(_page);
    console.log(_limit);
    const startIndex = (_page - 1) * _limit;
    const endIndex = startIndex + _limit;
    News.find({})
      .then((news) => {
        if (_page && _limit) {
          const _totalRows = news.length;
          const currentTinTucs = news
            .slice(startIndex, endIndex)
            .slice(0, _limit);
          res.json({
            data: currentTinTucs,
            pagination: {
              _page,
              _limit,
              _totalRows,
            },
          });
        } else if (_page) {
          const currentTinTucs = news.slice(startIndex, endIndex);
          res.json(currentTinTucs);
        } else if (_limit) {
          res.json(news.slice(0, _limit));
        } else {
          res.json(news);
        }
      })
      .catch(next);
  }
  // [GET] by news_id /news/:id

  getById(req, res, next) {
    News.findOne({ news_id: req.params.id })
      .then((news) => res.json(news))
      .catch(next);
  }

  // [PUT] /news/:id

  // [DELETE] /news/:id
}

module.exports = new NewsController();
