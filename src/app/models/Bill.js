const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bill = new Schema({
  bill_id: { type: String },
  staff_id: { type: String },
  table_number: { type: String },
  customer_id: { type: String },
  table_id: { type: String },
  total: { type: Number },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bill", Bill);
