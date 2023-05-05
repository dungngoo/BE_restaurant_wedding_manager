const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 255 },
    email: { type: String, required: true, maxLength: 255, unique: true },
    phone: { type: String, maxLength: 20 },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
