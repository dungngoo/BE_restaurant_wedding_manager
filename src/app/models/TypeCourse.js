// Bảng món ăn

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeCourse = new Schema({
  type_id: { type: String },
  name: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("TypeCourse", TypeCourse);
