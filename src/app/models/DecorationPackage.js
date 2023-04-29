const mongoose = require("mongoose");

const decorationPackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 255 },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    decorationItems: [
      {
        decorationItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DecorationItem",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DecorationPackage", decorationPackageSchema);
