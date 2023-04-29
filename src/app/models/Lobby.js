const mongoose = require("mongoose");

const LobbySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    constant: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imgs: {
      type: [String], // Mảng các chuỗi đường link ảnh
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

const Lobby = mongoose.model("Lobby", LobbySchema);

module.exports = Lobby;
