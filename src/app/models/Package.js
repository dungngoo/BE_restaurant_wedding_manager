const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  packageName: {
    type: String,
    required: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgs: {
    type: [String], // Mảng các chuỗi đường link ảnh
    required: true,
  },
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
