const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Table = new Schema({
    table_id: { type: String },
    table_number: { type: Number, min: 0, max: 50 },
    table_img: {type: String},
})


module.exports = mongoose.model('Table', Table);