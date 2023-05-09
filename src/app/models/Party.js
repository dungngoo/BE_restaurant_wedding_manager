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
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    tableQuantity: {
      type: Number,
      required: true,
    },
    menuId: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
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
    decorationPackageId: {
      type: Schema.Types.ObjectId,
      ref: "DecorationPackage",
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
