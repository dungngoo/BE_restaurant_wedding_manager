const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  serviceName: {
    type: String,
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceType",
    required: true,
  },
  description: {
    type: [String],
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
  param: {
    type: String,
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
