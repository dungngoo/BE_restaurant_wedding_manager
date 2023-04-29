// Bảng loại tiệc
const mongoose = require("mongoose");

const eventTypeSchema = new mongoose.Schema(
  {
    name: { type: String, maxLength: 255 },
    description: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EventType", eventTypeSchema);
