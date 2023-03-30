const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Promotion = new Schema({
  promotion_id: { type: String },
  name: { type: String },
});

module.exports = mongoose.model("Promotion", Promotion);
