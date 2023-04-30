const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  lobbyId: { type: Schema.Types.ObjectId, ref: "Lobby" },
  menuItems: [
    {
      menuItem: { type: Schema.Types.ObjectId, ref: "MenuItem" },
      quantity: Number,
    },
  ],
  services: [
    {
      service: { type: Schema.Types.ObjectId, ref: "Service" },
      quantity: Number,
    },
  ],
  eventDate: Date,
  startTime: Date,
  endTime: Date,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  specialRequests: String,
  status: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  tableQuantity: Number, // Số lượng bàn đặt trong đơn đặt tiệc
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
