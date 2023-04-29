const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventType",
    },
    hall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hall",
    },
    decorationPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DecorationPackage",
    },
    menuItems: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    services: [
      {
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    totalCost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
