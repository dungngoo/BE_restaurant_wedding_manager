const express = require("express");
const router = express.Router();

const ServicesController = require("../app/controllers/ServicesController");
// ServicesController.getLobbyByName ---  Lấy dịch vụ theo loại dịch vụ
router.use("/:type", ServicesController.getServiceByServiceType);
// ServicesController.getAll ---  Lấy tất cả các dịch vụ có của nhà hàng
router.use("/", ServicesController.getAll);

module.exports = router;
