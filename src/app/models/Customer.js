const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: [String],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  notes: {
    type: [String],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
