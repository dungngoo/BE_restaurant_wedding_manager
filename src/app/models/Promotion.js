const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 2000, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    discount: { type: Number, required: true },
    image: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Promotion", promotionSchema);
