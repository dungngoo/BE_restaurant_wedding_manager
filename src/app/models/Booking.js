const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  eventTypeId: { type: Schema.Types.ObjectId, ref: "EventType" },
  hallId: { type: Schema.Types.ObjectId, ref: "Hall" },
  menuItems: [{ menuItem: { type: Schema.Types.ObjectId, ref: "MenuItem" }, quantity: Number }],
  services: [{ service: { type: Schema.Types.ObjectId, ref: "Service" }, quantity: Number }],
  eventDate: Date,
  startTime: Date,
  endTime: Date,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  guestCount: Number,
  specialRequests: String,
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);