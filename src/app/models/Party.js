const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    eventDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    tableQuantity: {
      type: Number,
      required: true,
    },
    menuId: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
    },
    serviceTypeId: {
      type: Schema.Types.ObjectId,
      ref: "ServiceType",
      required: true,
    },
    services: [
      {
        service: {
          type: Schema.Types.ObjectId,
          ref: "Service",
        },
      },
    ],
    lobbyId: {
      type: Schema.Types.ObjectId,
      ref: "Lobby",
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Party", eventSchema);
