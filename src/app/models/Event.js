const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 2000, required: true },
    date: { type: Date, required: true },
    location: { type: String, maxLength: 255, required: true },
    type: {
      type: String,
      enum: ["Sự kiện cưới", "Sự kiện công ty", "Sự kiện cá nhân khác"],
      required: true,
    },
    imgs: [{ type: String, maxLength: 255 }],
    param: { type: String, maxLength: 255, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
