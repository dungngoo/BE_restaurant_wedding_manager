const mongoose = require("mongoose");

const menuItemsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 255 },
    description: { type: String },
    image: { type: String },
    menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MenuItems", menuItemsSchema);
