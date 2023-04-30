const mongoose = require("mongoose");

const decorationPackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "DecorationItem" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DecorationPackage", decorationPackageSchema);
