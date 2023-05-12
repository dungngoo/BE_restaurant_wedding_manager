const express = require("express");
const router = express.Router();

const bookingController = require("../app/controllers/bookingController");

// bookingController.index

router.delete("/deletePendingBookings", bookingController.deletePending);
router.post("/sendEmail", bookingController.sendEmail);
router.put("/updateBooking/:id", bookingController.updateBookingStatus);
router.post("/", bookingController.createBooking);
router.use("/", bookingController.getAll);

module.exports = router;
