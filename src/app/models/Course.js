// Bảng món ăn

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    course_id: {type: String},
    name: { type: String, maxLength: 255 },
    description: { type: String },
    price: { type: Number, min: 0 },
    unit: { type: String },
    type_id: { type: String },

})


module.exports = mongoose.model('Course', Course);