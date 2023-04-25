const express = require("express");
const router = express.Router();

const promotionController = require("../app/controllers/PromotionController");

// promotionController.index
router.use("/:id", promotionController.getById);
router.use("/", promotionController.index);

module.exports = router;
