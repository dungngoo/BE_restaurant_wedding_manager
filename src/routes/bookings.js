const express = require("express");
const router = express.Router();

const bookingController = require("../app/controllers/bookingController");

// bookingController.index

router.use("/caculateMonth", bookingController.calculateByMonth);
router.delete("/deletePendingBookings", bookingController.deletePending);
router.post("/sendEmail", bookingController.sendEmail);
router.post("/exportInvoiceToPDF", bookingController.postInvoiceToPDF);
router.use("/exportInvoiceToPDF", bookingController.exportInvoiceToPDF);
router.put("/updateBooking/:id", bookingController.updateBookingStatus);
router.use("/export/:bookingId", bookingController.exportInvoice);
router.use("/caculate", bookingController.calculateByWeek);
router.post("/", bookingController.createBooking);
router.use("/", bookingController.getAll);

module.exports = router;
