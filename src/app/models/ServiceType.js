const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  imgs: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
  },
});

const ServiceType = mongoose.model("ServiceType", serviceTypeSchema);

module.exports = ServiceType;
