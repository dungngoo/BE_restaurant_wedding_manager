// Bảng món ăn

const mongoose = require("mongoose");

const foodTypes = ["main", "side"]; // Khai báo các giá trị cho enum
const foodSchema = new mongoose.Schema(
  {
    name: { type: String, maxLength: 255 },
    description: { type: String },
    double: { type: Number, min: 0 },
    unit: { type: String },
    type: { type: String, enum: foodTypes }, // Sử dụng enum cho trường type
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Food", foodSchema);
