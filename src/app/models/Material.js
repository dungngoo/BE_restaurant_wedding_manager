const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Material = new Schema({
  material_id: { type: String },
  name: { type: String, maxLength: 255 },
  unit: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Material", Material);
