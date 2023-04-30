const express = require("express");
const router = express.Router();

const EventController = require("../app/controllers/EventController");
router.use("/name/:name", EventController.getEventByName);
router.use("/:param", EventController.getEventsByParam);
router.use("/", EventController.getAll);

module.exports = router;
