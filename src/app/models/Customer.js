const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema({
  customer_id: { type: String },
  name: { type: String, maxLength: 255 },
  address: { type: String },
  phone_number: { type: String },
  citizen_identification: { type: String },
});

module.exports = mongoose.model("Customer", Customer);
