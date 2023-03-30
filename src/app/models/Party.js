const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Party = new Schema({
  party_id: { type: String },
  type_party: { type: String, maxLength: 255 },
});

module.exports = mongoose.model("Party", Party);