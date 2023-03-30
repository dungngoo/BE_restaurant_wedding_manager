const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Staff = new Schema({
  staff_id: { type: String },
  fullname: { type: String, maxLength: 255 },
  staff_img: {type: String,},
  address: {type: String,},
  bird: {type: String,},
  sex: {type: String,},
  phonenumber: {type: String,},
  job_type: {type: String,},
});

module.exports = mongoose.model("Staff", Staff);
