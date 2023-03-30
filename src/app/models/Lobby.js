const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Lobby = new Schema({
  lobby: { type: String },
  number_lobby: { type: number},
});

module.exports = mongoose.model("Lobby", Lobby);