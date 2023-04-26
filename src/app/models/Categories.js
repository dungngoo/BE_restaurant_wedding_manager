// Bảng món ăn

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, maxLength: 255 },
  description: { type: String },
});

mongoose.model("Categories", categorySchema);
