const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, maxLength: 255 },
    price: { type: Number, min: 0 },
    description: { type: String },
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
        quantity: { type: Number, default: 1, min: 1 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Menu", menuSchema);
