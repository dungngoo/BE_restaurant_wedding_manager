const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 2000, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    image: { type: String, required: true },
    serviceTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceType",
      required: true,
    },
    param: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Promotion", promotionSchema);
