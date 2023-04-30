const express = require("express");
const router = express.Router();

const promotionsController = require("../app/controllers/PromotionsController");

router.use("/type/", promotionsController.getPromotionByServiceType);
router.use("/:param", promotionsController.getPromotionByParam);
router.use("/", promotionsController.getAll);

module.exports = router;
