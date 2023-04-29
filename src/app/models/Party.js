const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    eventType: {
      type: Schema.Types.ObjectId,
      ref: "EventType",
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
    },
    menuItems: [
      {
        menuItem: {
          type: Schema.Types.ObjectId,
          ref: "MenuItem",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    services: [
      {
        service: {
          type: Schema.Types.ObjectId,
          ref: "Service",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    lobby: {
      type: Schema.Types.ObjectId,
      ref: "Lobby",
      required: true,
    },
    decorationPackage: {
      type: Schema.Types.ObjectId,
      ref: "DecorationPackage",
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
