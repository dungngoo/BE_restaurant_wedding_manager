const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartyOrder = new Schema({
  party_id: { type: String },
  lobby_id: { type: String },
  customer_id: { type: String },
  news_id: { type: String },
  table_id: { type: String },
  course_id: { type: String },
  number_table: { type: String },
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PartyOrder", PartyOrder);
