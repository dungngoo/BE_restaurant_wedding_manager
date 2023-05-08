const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  lobbyId: { type: Schema.Types.ObjectId, ref: "Lobby", required: true },
  customerId: { type: Schema.Types.ObjectId, ref: "Contact", require: true },
  menuId: {
    type: Schema.Types.ObjectId,
    ref: "Menu",
    require: true,
  },
  services: [
    {
      service: { type: Schema.Types.ObjectId, ref: "Service" },
    },
  ],
  serviceTypeId: {
    type: Schema.Types.ObjectId,
    ref: "ServiceType",
    required: true,
  },
  eventDate: Date,
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
