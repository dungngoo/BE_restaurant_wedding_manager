const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 255 },
    capacity: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    lobby: { type: mongoose.Schema.Types.ObjectId, ref: "Lobby" },
    party: { type: mongoose.Schema.Types.ObjectId, ref: "Party" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Table", tableSchema);
