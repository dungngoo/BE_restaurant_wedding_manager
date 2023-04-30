const express = require("express");
const router = express.Router();

const bookingController = require("../app/controllers/BookingController");

// bookingController.index
router.use("/sendEmail", bookingController.sendEmail);
router.post("/", bookingController.createBooking);
router.use("/", bookingController.index);

module.exports = router;