const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillDetails = new Schema({
  bill_id: { type: String },
  staff_id: { type: String },
  table_id: { type: String },
  party_id: { type: String },
  table_id: { type: String },
  table_number: { type: Number },
  course_number: { type: Number },
  price: { type: Number },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BillDetails", BillDetails);
