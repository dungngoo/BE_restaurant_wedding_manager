const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const News = new Schema({
  news_id: { type: String },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("News", News);
