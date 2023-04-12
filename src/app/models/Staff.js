const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Staff = new Schema(
  {
    staff_id: { type: String },
    fullname: { type: String, maxLength: 60 },
    email: { type: String, maxLength: 100, unique: true },
    address: { type: String },
    birth: { type: String },
    birthPlace: { type: String },
    date: { type: String },
    dateOfPlace: { type: String },
    phonenumber: { type: String, unique: true },
    identify: { type: String, maxLength: 25, unique: true },
    staffImg: { type: String, unique: true },
    sex: { type: String },
    job_type: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Staff", Staff);
